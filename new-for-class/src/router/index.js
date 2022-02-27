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

export default router
