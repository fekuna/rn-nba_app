import React from 'react';
import {
	createStackNavigator,
	createBottomTabNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Logo from '../components/utils/logo';

// SCREENS
import SignIn from './auth';
import News from './news';
import NewsArticle from './news/newsArticle';
import Games from './games';
import GamesArticle from './games/gamesArticle';

const headerConf = {
	headerLayoutPreset: 'center',
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#001338'
		},
		headerTintColor: '#eee',
		headerTitle: Logo
	}
};

const NewsStack = createStackNavigator(
	{
		News,
		Article: NewsArticle
	},
	headerConf
);

const GamesStack = createStackNavigator(
	{
		Games,
		Article: GamesArticle
	},
	headerConf
);

const AppStack = createBottomTabNavigator(
	{
		News: NewsStack,
		Games: GamesStack
	},
	{
		tabBarOptions: {
			activeTintColor: '#eee',
			showLabel: false,
			activeBackgroundColor: '#00194b',
			inactiveBackgroundColor: '#001338',
			style: {
				backgroundColor: '#001338'
			}
		},
		initialRouteName: 'News',
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'News') {
					iconName = `ios-basketball`;
				} else if (routeName === `Games`) {
					iconName = `md-tv`;
				}

				return <Ionicons name={iconName} size={25} color={tintColor} />;
			}
		})
	}
);

const AuthStack = createStackNavigator(
	{
		SignIn
	},
	{
		headerMode: 'none'
	}
);

export const RootNavigator = () =>
	createAppContainer(
		createSwitchNavigator(
			{
				App: AppStack,
				Auth: AuthStack
			},
			{ initialRouteName: 'Auth' }
		)
	);
