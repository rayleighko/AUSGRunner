import React from 'react'
import {shallow} from 'enzyme'
import {CreatedByContainer, HomeContainer, PlayGroundContainer} from "../"

describe('Containers', () => {
	describe('Home Container', () => {
		it('should render', () => {
			const tree = shallow(<HomeContainer/>)
			expect(tree).toMatchSnapshot()
		})
	})
	describe('CreatedBy Container', () => {
		it('should render', () => {
			const tree = shallow(<CreatedByContainer/>)
			expect(tree).toMatchSnapshot()
		})
	})
	describe('PlayGround Container', () => {
		it('should render', () => {
			const tree = shallow(<PlayGroundContainer/>)
			expect(tree).toMatchSnapshot()
		})
	})
})