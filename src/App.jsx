import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import {CreatedByContainer, HomeContainer, PlayGroundContainer} from './containers'

export default () => {
	return (
		<Router>
			<Route path={'/'} exact component={HomeContainer}/>
			<Route path={'/createdby'} component={CreatedByContainer}/>
			<Route path={'/playground'} component={PlayGroundContainer}/>
		</Router>
	)
}
