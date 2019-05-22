import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const Input = (props) => {
	let template = null

	switch (props.type) {
		case 'textinput':
			template = <TextInput {...props} style={[ styles.input, props.overrideStyle ]} />
			break
		default:
			return template
	}

	return template
}

export default Input

const styles = StyleSheet.create({
	input: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#eaeaea',
		fontSize: 16,
		padding: 5,
		marginTop: 10
	}
})
