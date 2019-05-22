import React from 'react'
import { Platform } from 'react-native'

import {
	createStackNavigator,
	createBottomTabNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation'

// SCREENS
import SignIn from './auth'
import News from './news'
import Games from './games'

const AppStack = createBottomTabNavigator({
	News,
	Games
})

const AuthStack = createStackNavigator(
	{
		SignIn
	},
	{
		headerMode: 'none'
	}
)

export const RootNavigator = () =>
	createAppContainer(
		createSwitchNavigator(
			{
				App: AppStack,
				Auth: AuthStack
			},
			{ initialRouteName: 'Auth' }
		)
	)
