import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Input from '../../components/input/input'

class AuthForm extends Component {
	state = {
		type: 'Login',
		action: 'Login',
		actionMode: 'I want to register',
		hasErrors: false,
		form: {
			email: {
				value: '',
				valid: false,
				type: 'textinput',
				rules: {
					isRequired: true,
					isEmail: true
				}
			},
			password: {
				value: '',
				valid: false,
				type: 'textinput',
				rules: {
					minLength: 6,
					isRequired: true
				}
			},
			confirmPassword: {
				value: '',
				valid: false,
				type: 'textinput',
				rules: {
					confirmPass: 'password'
				}
			}
		}
	}

	render() {
		return (
			<View>
				<Input
					type={this.state.form.email.type}
					placeholder="Enter Email Address"
					placeholderTextColor="#cecece"
					value={this.state.form.email.value}
					autoCapitalize={'none'}
					keyboardType={'email-address'}
				/>
			</View>
		)
	}
}

export default AuthForm
