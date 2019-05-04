import React from 'react'

import { storiesOf } from '@storybook/react'

import {Layout} from '../components'
import {TRexContainer} from '../containers'

storiesOf('Components|Layout', module)
.add('Empty', ({style}) => <Layout />)

storiesOf('Containers|TRexContainer', module)
  .add('Play', () => <TRexContainer />)
