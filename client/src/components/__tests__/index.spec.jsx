import React from 'react'
import {shallow} from 'enzyme'
import {
	Layout, Header, Footer, CreatedBy, Home, PlayGround, 
	BackToHome, Player, Ball, Map, BottomTile, WallTile
} from '../'


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

	describe('Footer test suite', () => {
		it('should render', () => {
			const tree = shallow(<Footer/>)
			expect(tree).toMatchSnapshot()
		})
	})
})

describe('Menu Components', () => {
	describe('CreatedBy test suite', () => {
		it('should render', () => {
			const tree = shallow(<CreatedBy/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('Home test suite', () => {
		it('should render', () => {
			const tree = shallow(<Home/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('PlayGround test suite', () => {
		it('should render', () => {
			const tree = shallow(<PlayGround/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('BackToHome test suite', () => {
		it('should render', () => {
			const tree = shallow(<BackToHome/>)
			expect(tree).toMatchSnapshot()
		})
	})
})

describe('Creature Components', () => {
	describe('Player test suite', () => {
		it('should render', () => {
			const tree = shallow(<Player/>)
			expect(tree).toMatchSnapshot()
		})
	})
})

describe('Elements Components', () => {
	describe('Ball test suite', () => {
		it('should render', () => {
			const tree = shallow(<Ball/>)
			expect(tree).toMatchSnapshot()
		})
	})
})

describe('Map Components', () => {
	describe('Map test suite', () => {
		it('should render', () => {
			const tree = shallow(<Map/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('BottomTile test suite', () => {
		it('should render', () => {
			const tree = shallow(<BottomTile/>)
			expect(tree).toMatchSnapshot()
		})
	})

	describe('WallTile test suite', () => {
		it('should render', () => {
			const tree = shallow(<WallTile/>)
			expect(tree).toMatchSnapshot()
		})
	})
})