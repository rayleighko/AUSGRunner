import React from 'react'
import {shallow} from 'enzyme'
import {Layout, Header, Footer} from '../'
import {HeaderNav} from "../common/HeaderNav"


describe('Common Components', () => {
	describe('Layout test suite', () => {
		it('should render', () => {
			const tree = shallow(<Layout/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('Header test suite', () => {
		it('should render', () => {
			const tree = shallow(<Header/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('HeaderNav test suite', () => {
		it('should render', () => {
			const tree = shallow(<HeaderNav/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('Footer test suite', () => {
		it('should render', () => {
			const tree = shallow(<Footer/>)
			expect(tree).toMatchSnapshot()
		})
	})
})