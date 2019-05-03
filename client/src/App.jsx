import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import {MainContainer} from './containers'

export default () => {
	return (
		<Router>
			<Route path={'/'} exact component={MainContainer}/>
		</Router>
	)
}
