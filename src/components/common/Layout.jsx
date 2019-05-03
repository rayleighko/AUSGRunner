
import React from 'react'
<<<<<<< HEAD:src/components/common/Layout.jsx
import {Footer} from './Footer'
=======
import {LogPanel} from './Footer'
>>>>>>> 5eb4d1d63d8e4d067ad908fdc4de725fdd0653c8:src/components/common/Layout.jsx
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