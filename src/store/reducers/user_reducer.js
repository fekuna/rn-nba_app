const initialState = {}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SIGN_IN':
			return state
		default:
			return state
	}
}
