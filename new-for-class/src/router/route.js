// layout
import MainLayout from '@/layout/MainLayout.vue'
import TeacherLayout from '@/layout/TeacherLayout.vue'
import StudentLayout from '@/layout/StudentLayout.vue'

// pages
import Home from '@/pages/teacher/Home.vue'
import AddExam from '@/pages/teacher/exam/AddExam.vue'
import OldExam from '@/pages/teacher/exam/OldExam.vue'
import History from '@/pages/teacher/history/History.vue'
import HistoryDetail from '@/pages/teacher/history/HistoryDetail.vue'
import Login from '@/pages/teacher/Login.vue'
import RoomEntry from '@/pages/student/RoomEntry.vue'
import NoExistRoom from '@/pages/student/NoExistRoom.vue'

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
				component: AddExam,
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
	{
		path: '/start/:id',
		component: TeacherLayout,
		name: 'StartGame',
		meta: { requiresAuth: true },
	},
	{
		path: '/play/:id',
		component: StudentLayout,
		name: 'PlayGame',
	},
	{
		path: '/login',
		component: Login,
		name: 'Login',
	},
	{
		path: '/room',
		component: RoomEntry,
		name: 'RoomEntry',
	},
	{
		path: '/noroom',
		component: NoExistRoom,
		name: 'NoExistRoom',
	}
]

export default routes
