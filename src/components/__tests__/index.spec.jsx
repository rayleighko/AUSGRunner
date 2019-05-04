import React from 'react'
import {shallow} from 'enzyme'
import {Layout} from '../'


describe('Common Components', () => {
	describe('Layout test suite', () => {
		it('should render', () => {
			const tree = shallow(<Layout/>)
			expect(tree).toMatchSnapshot()
		})
	})
})