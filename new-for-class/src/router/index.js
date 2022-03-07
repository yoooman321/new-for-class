import { createRouter, createWebHistory } from 'vue-router'
import routes from './route'

const router = createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}

		return { left: 0, top: 0 }
	},
})

router.beforeEach((to, from, next) => {
	if (
		to.matched.some((record) => {
			return record.meta.requiresAuth
		})
	) {
		const userInformation = sessionStorage.getItem(
			'firebase:authUser:AIzaSyBASu7jS0Ivr3VAs1xX0-Cb2qdEKCWa1SA:[DEFAULT]'
		)
		if (!userInformation) {
			next('/login')
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
