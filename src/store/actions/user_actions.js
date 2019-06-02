import axios from 'axios';

import { SIGN_IN, SIGN_UP, AUTO_SIGN_IN } from '../types';
import { SIGNIN, SIGNUP, REFTOKEN, FIREBASEURL } from '../../components/utils/keys';

export const signUp = (data) => (dispatch) => {
	axios({
		method: 'POST',
		url: SIGNUP,
		data: {
			email: data.email,
			password: data.password,
			returnSecureToken: true
		},
		header: {
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			dispatch({
				type: SIGN_UP,
				payload: response.data
			});
			// console.log(response);
			// return response;
		})
		.catch((err) => {
			return false;
		});
};

export const signIn = (data) => (dispatch) => {
	return axios({
		method: 'POST',
		url: SIGNIN,
		data: {
			email: data.email,
			password: data.password,
			returnSecureToken: true
		},
		header: {
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			dispatch({
				type: SIGN_IN,
				payload: response.data
			});
			return setTokens(response);
		})
		.catch((err) => {
			return false;
		});
};

export const autoSignIn = (refToken, cb) => (dispatch) => {
	 axios({
		method: 'POST',
		url: REFTOKEN,
		data: `grant_type=refresh_token&refresh_token=${refToken}`,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
		.then((response) => {
			dispatch({
				type: AUTO_SIGN_IN,
				payload: response.data
			})
			cb()
		})
		.catch((err) => false);
};
