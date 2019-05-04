
import React from 'react'
import {LogPanel} from './Footer'
import {StatusBar} from './Header'

export const Layout = ({isPlay = false, children}) => (
	<div id='wrap'>
		<head>
			<title>DungeonsNGurumi</title>
		</head>
		{isPlay && <StatusBar />}
		{children}
		<LogPanel/>
	</div>
)