import React from 'react'
import {Footer} from './Footer'
import {Header} from './Header'

export const Layout = ({children}) => (
	<div id='wrap'>
		<head>
			<title>DungeonsNGurumi</title>
		</head>
		<Header />
		{children}
		<Footer/>
	</div>
)
