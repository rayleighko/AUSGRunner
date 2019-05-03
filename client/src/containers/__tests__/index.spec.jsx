import React from 'react'
import {shallow} from 'enzyme'
import {LoginContainer, MainContainer, RegisterContainer} from "../"

describe('Containers', () => {
	describe('Main Container', () => {
		it('should render', () => {
			const tree = shallow(<MainContainer/>)
			expect(tree).toMatchSnapshot()
		})
	})
})