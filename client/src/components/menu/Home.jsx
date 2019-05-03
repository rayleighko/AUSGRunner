import React from 'react'
import {Link} from 'react-router-dom'
import {Layout} from '../common'

export const Home = () => {
	return (
        <Layout>
            <Link to={'/createdby'}>Created By</Link>
            <Link to={'/playground'}>Single Play</Link>
        </Layout>
	)
}
