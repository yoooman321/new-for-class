// layout
import MainLayout from '@/layout/MainLayout.vue'

// pages
import Home from '@/pages/teacher/Home.vue'
import AddExam from '@/pages/teacher/exam/AddExam.vue'
import OldExam from '@/pages/teacher/exam/OldExam.vue'
import EditExam from '@/pages/teacher/exam/EditExam.vue'
import History from '@/pages/teacher/history/History.vue'
import HistoryDetail from '@/pages/teacher/history/HistoryDetail.vue'

const routes = [
	{
		path: '/',
		component: MainLayout,
		meta: { requiresAuth: true },
		children: [
			{ path: '', name: 'Index', component: Home },
			{ path: '/new', name: 'NewExam', component: AddExam },
			{ path: '/old', name: 'OldExam', component: OldExam },
			{
				path: '/edit/:id',
				name: 'EditExam',
				component: EditExam,
				props: true,
			},
			{ path: '/history', name: 'History', component: History },
			{
				path: '/history/:id',
				name: 'HistoryDetail',
				component: HistoryDetail,
				props: true,
			},
		],
	},
]

export default routes
