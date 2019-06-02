import AsyncStorage from '@react-native-community/async-storage';

export const FIREBASEURL = `https://nba-app-c0451.firebaseio.com`;
export const APIKEY = `AIzaSyCpcIGePFLGof5vrDxEPXFpDu3I7asXOsk`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFTOKEN = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const setTokens = (user, cb) => {
	const dateNow = new Date();
	const expiration = dateNow.getTime() + 3600 * 1000;

	AsyncStorage.multiSet([
		[ '@nba_app@token', user.token ],
		[ '@nba_app@refreshToken', user.refToken ],
		[ '@nba_app@expireToken', expiration.toString() ],
		[ '@nba_app@uid', user.uid ]
	]).then((response) => {
		cb();
	});
};

export const getTokens = (cb) => {
	AsyncStorage.multiGet([
		'@nba_app@token',
		'@nba_app@refreshToken',
		'@nba_app@expireToken',
		'@nba_app@uid'
	]).then((response) => {
		cb(response);
	});
};
