import React from 'react'
import {shallow} from 'enzyme'
import {TRexContainer, RankingContainer} from "../"

describe('Containers', () => {
	describe('T-Rex Container', () => {
		it('should render', () => {
			const tree = shallow(<TRexContainer/>)
			expect(tree).toMatchSnapshot()
		})
	})
	describe('Ranking Container', () => {
		it('should render', () => {
			const tree = shallow(<RankingContainer/>)
			expect(tree).toMatchSnapshot()
		})
	})
})