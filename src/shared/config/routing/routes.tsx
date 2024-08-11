import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import { Notifications } from 'pages/notifications'
import CreateOrder from 'pages/create-order'
import { Completed } from 'pages/completed'
import { Profile } from 'pages/profile'
import Settings from 'pages/settings'
import Preview from 'pages/preview'
import Auth from 'pages/auth'
import Main from 'pages/main'

import { Layout } from 'entities/layout'

import { NAV } from 'shared/config/routing/router'

export const router = createBrowserRouter([
	{
		element: <Layout/>,
		path: NAV.root(),
		children: [
			{
				element: <Main/>,
				path: NAV.root(),
			},
			{
				element: <Completed/>,
				path: 'completed',
			},
			{
				element: <Notifications/>,
				path: 'notifications',
			},
			{
				element: <Profile/>,
				path: 'profile',
			},
			//
			{
				element: <Auth/>,
				path: NAV.auth(),
			},
			{
				element: <Preview/>,
				path: NAV.previewNav(),
			},
			{
				element: <Settings/>,
				path: NAV.settings(),
			},
			{
				element: <CreateOrder/>,
				path: NAV.createOrderId(),
			},
			{
				element: <CreateOrder/>,
				path: NAV.viewOrderId(),
			},
		],
	},
])
