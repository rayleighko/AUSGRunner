import React from 'react'
import {shallow} from 'enzyme'
import {Layout, Runner, PlayersList, PlayersListLoader} from '..'

describe('Components', () => {
	describe('Layout Components', () => {
		describe('test suite', () => {
			it('should render', () => {
				const tree = shallow(<Layout/>)
				expect(tree).toMatchSnapshot()
			})
		})
	})

	describe('PlayerList Components', () => {
		describe('test suite', () => {
			it('should render', () => {
				const tree = shallow(<PlayersList/>)
				expect(tree).toMatchSnapshot()
			})
		})
		describe('test suite', () => {
			it('should render', () => {
				const tree = shallow(<PlayersListLoader/>)
				expect(tree).toMatchSnapshot()
			})
		})
	})

	describe('Runner Components', () => {
		describe('test suite', () => {
			it('should render', () => {
				const tree = shallow(<Runner/>)
				expect(tree).toMatchSnapshot()
			})
		})
	})
})