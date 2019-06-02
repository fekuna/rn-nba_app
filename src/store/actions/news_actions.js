import axios from 'axios';

import { GET_NEWS } from '../types';
import { FIREBASEURL } from '../../components/utils/keys';

export const getNews = () => (dispatch) => {
	axios({
		method: 'GET',
		url: `${FIREBASEURL}/news.json`
	})
		.then((response) => {
			// console.log(response.data);
			const articles = Object.keys(response.data).map((key) => {
				return {
					id: key,
					...response.data[key]
				};
			});

			dispatch({
				type: GET_NEWS,
				payload: articles
			});
		})
		.catch((err) => console.log(err));
};
