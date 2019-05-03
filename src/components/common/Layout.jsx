
import React from 'react'
import {Footer} from './Footer'
import {StatusBar} from './Header'

export const Layout = ({isPlay = false, children}) => (
	<div id='wrap'>
		<head>
			<title>DungeonsNGurumi</title>
		</head>
		{isPlay && <StatusBar />}
		{children}
		<Footer/>
	</div>
)