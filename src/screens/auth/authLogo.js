import React from 'react'
import { View, Image } from 'react-native'

import LogoImage from '../../assets/images/nba_login_logo.png'

const AuthLogo = () => (
	<View style={{ alignItems: 'center' }}>
		<Image
			source={LogoImage}
			style={{
				width: 170,
				height: 150
			}}
			resizeMode="center"
		/>
	</View>
)

export default AuthLogo
