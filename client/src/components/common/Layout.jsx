
import React from 'react'
import {Footer} from './Footer'
import {Header} from './Header'

export const Layout = ({isPlay = false, children}) => (
	<div id='wrap'>
		<head>
			<title>DungeonsNGurumi</title>
		</head>
		{isPlay && <Header />}
		{children}
		<Footer/>
	</div>
)