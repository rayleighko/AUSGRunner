import React from 'react'
import {storiesOf} from '@storybook/react'
import {MainContainer} from '../src/containers/'

storiesOf('Containers/MainContainer', module)
	.add('default', () => <MainContainer />)
