import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getTokens, setTokens } from '../../components/utils/keys';
import { autoSignIn } from '../../store/actions/user_actions';

import AuthLogo from './authLogo';
import AuthForm from './authForm';

class AuthScreen extends Component {
	state = {
		loading: true
	};

	goNext = () => {
		this.props.navigation.navigate('App');
	};

	componentDidMount() {
		getTokens((value) => {
			if (value[0][1] === null) {
				console.log('no value')
				this.setState({ loading: false });
			} else {
				this.props.onAutoSignIn(value[1][1], () => {
					if (!this.props.User.auth.token) {
						this.setState({ loading: false });
					} else {
						setTokens(this.props.User.auth, () => {
							this.goNext();
						});
					}
				});
			}
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={styles.loading}>
					<ActivityIndicator />
				</View>
			);
		} else {
			return (
				<ScrollView style={styles.container}>
					<View>
						<AuthLogo />
						<AuthForm goNext={this.goNext} />
					</View>
				</ScrollView>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		User: state.User
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAutoSignIn: (refToken, cb) => dispatch(autoSignIn(refToken, cb))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

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
});
