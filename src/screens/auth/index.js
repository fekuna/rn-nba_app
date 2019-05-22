import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'

import AuthLogo from './authLogo'
import AuthForm from './authForm'

class AuthScreen extends Component {
	state = {
		loading: false
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={styles.loading}>
					<ActivityIndicator />
				</View>
			)
		} else {
			return (
				<ScrollView style={styles.container}>
					<View>
						<AuthLogo />
						<AuthForm />
					</View>
				</ScrollView>
			)
		}
	}
}

export default AuthScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1d428a',
		padding: 50
	},
	loading: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
