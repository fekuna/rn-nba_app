import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import { connect } from 'react-redux';

import Input from '../../components/input/input';
import ValidationRules from '../../components/utils/validationRules';
import { signIn, signUp } from '../../store/actions/user_actions';
import { setTokens } from '../../components/utils/keys';

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
	};

	formHasErrors = () =>
		this.state.hasErrors ? (
			<View style={styles.errorContainer}>
				<Text style={styles.errorLabel}>Oops, check your info</Text>
			</View>
		) : null;

	confirmPassword = () =>
		this.state.type !== 'Login' ? (
			<Input
				type={this.state.form.confirmPassword.type}
				placeholder="Confirm Password"
				placeholderTextColor="#cecece"
				value={this.state.form.confirmPassword.value}
				onChangeText={(value) => this.changeInput('confirmPassword', value)}
				secureTextEntry
			/>
		) : null;

	changeInput = (name, value) => {
		const formCopy = this.state.form;
		formCopy[name].value = value;

		// Rules
		let rules = formCopy[name].rules;
		let isValid = ValidationRules(value, rules, formCopy);

		formCopy[name].valid = isValid;

		this.setState({
			hasErrors: false,
			form: formCopy
		});
	};

	changeFormType = () => {
		const type = this.state.type;

		this.setState({
			type: type === 'Login' ? 'Register' : 'Login',
			action: type === 'Login' ? 'Register' : 'Login',
			actionMode: type === 'Login' ? 'I want to Login' : 'I want to Register'
		});
	};

	submitUser = () => {
		let isFormValid = true;
		let formToSubmit = {};
		const formCopy = this.state.form;

		for (let key in formCopy) {
			if (this.state.type === 'Login') {
				// Login
				if (key !== 'confirmPassword') {
					isFormValid = isFormValid && formCopy[key].valid;
					formToSubmit[key] = formCopy[key].value;
				}
			} else {
				// Register
				isFormValid = isFormValid && formCopy[key].valid;
				formToSubmit[key] = formCopy[key].value;
			}
		}

		if (isFormValid) {
			if (this.state.type === 'Login') {
				this.props.onLoginUser(formToSubmit).then(() => {
					this.manageAccess();
				});
			} else {
				this.props.onRegisterUser(formToSubmit);
			}
		} else {
			this.setState({
				hasErrors: true
			});
		}
	};

	manageAccess = () => {
		if (!this.props.User.auth.uid) {
			this.setState({
				hasErrors: true
			});
		} else {
			setTokens(this.props.User.auth, () => {
				this.setState({
					hasErrors: false
				});
				this.props.goNext();
			});
		}
	};

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
					onChangeText={(value) => this.changeInput('email', value)}
				/>
				<Input
					type={this.state.form.password.type}
					placeholder="Enter password"
					placeholderTextColor="#cecece"
					value={this.state.form.password.value}
					onChangeText={(value) => this.changeInput('password', value)}
					secureTextEntry
				/>

				{this.confirmPassword()}
				{this.formHasErrors()}

				<View style={styles.button}>
					<Button title={this.state.action} onPress={this.submitUser} />
				</View>
				<View style={styles.button}>
					<Button title={this.state.actionMode} onPress={this.changeFormType} />
				</View>
				<View style={styles.button}>
					<Button title="I'll do it later" onPress={() => this.props.goNext()} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	errorContainer: {
		marginBottom: 10,
		marginTop: 30,
		padding: 10,
		backgroundColor: '#f44336'
	},
	errorLabel: {
		color: '#fff',
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	button: {
		...Platform.select({
			ios: {
				marginBottom: 0
			},
			android: {
				marginBottom: 10,
				marginTop: 10
			}
		})
	}
});

const mapStateToProps = (state) => {
	return {
		User: state.User
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRegisterUser: (userData) => dispatch(signUp(userData)),
		onLoginUser: (userData) => dispatch(signIn(userData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
