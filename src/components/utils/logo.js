import React from 'react';
import { Image } from 'react-native';

import LogoImg from '../../assets/images/nba_login_logo.png';

const LogoTitle = () => (
    <Image 
        source={LogoImg}
        style={{width: 75, height: 30}}
        resizeMode= 'contain'
    />
)

export default LogoTitle