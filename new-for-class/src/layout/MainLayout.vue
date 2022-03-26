<template>
	<div class="main-layout">
		<!-- header -->
		<div class="header bgc-main">
			<div class="header-container">
				<div class="title c-fff fz-20 fw-700">課堂使用</div>

				<div class="navbar-list">
					<div
						v-for="navbar in navbarList"
						:key="navbar.pathName"
						:class="[
							'navbar',
							{ 'navbar--active': router.name === navbar.pathName },
						]"
					>
						<router-link :to="{ name: navbar.pathName }">
							<div class="navbar__text fz-16 c-fff">{{ navbar.title }}</div>
						</router-link>
					</div>
				</div>

				<ul class="user-information cursor-pointer">
					<li class="user-information-li">
						<img
							class="user-information__icon"
							src="@/assets/images/teacher/icon/user.svg"
						/>
						<ul class="user-information__dropdown">
							<li class="dropdown__item cursor-pointer" @click="processSignOut">
								<img
									class="user-information__icon cursor-pointer"
									src="@/assets/images/teacher/icon/logout.svg"
								/>
								<div class="user-information__text">
									登出
								</div>
							</li>
						</ul>
					</li>
				</ul>

				<!-- <div class="menu cursor-pointer" @click="setShowSidebar">
					<img
						class="menu-icon"
						src="@/assets/images/teacher/icon/menu.svg"
						alt=""
					/>
				</div> -->
			</div>
		</div>

		<!-- sidebar only show if screen is small -->
		<!-- <div class="sidebar" v-if="showSidebar">
			<div class="sidebar-list">
				<div
					v-for="navbar in navbarList"
					class="sidebar"
					:key="navbar.pathName"
				>
					<router-link :to="{ name: navbar.pathName }">
						<div class="sidebar__text">{{ navbar.title }}</div>
					</router-link>
				</div>
			</div>
		</div> -->

		<div class="content">
			<router-view></router-view>
		</div>
	</div>

	<AlertMessage v-if="showErrorMessage">
		<div>請重新再試一次</div>
	</AlertMessage>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useSystemStore } from '@/stores/system'

import AlertMessage from '@/components/popup/AlertMessage.vue'

export default {
	components: {
		AlertMessage,
	},

	setup() {
		const router = useRouter()

		const navbarList = [
			{
				title: '新增考題',
				pathName: 'NewExam',
			},
			{
				title: '我的考題',
				pathName: 'OldExam',
			},
			{
				title: '歷史紀錄',
				pathName: 'History',
			},
		]

		const showSidebar = ref(false)

		const setShowSidebar = () => {
			showSidebar.value = !showSidebar.value
		}

		const { switchLoadingFlag } = useSystemStore()

		// sign out
		const showErrorMessage = ref(false)
		const auth = getAuth()

		const processSignOut = () => {
			switchLoadingFlag(true)
			signOut(auth)
				.then(() => {
					localStorage.removeItem('uid')
					router.push('/login')
				})
				.catch(() => {
					showErrorMessage.value = true
					setTimeout(() => {
						showErrorMessage.value = false
					}, 3000)
				})
				.finally(() => {
					switchLoadingFlag(false)
				})
		}

		return {
			navbarList,
			router,
			showSidebar,
			showErrorMessage,
			processSignOut,
		}
	},
}
</script>
