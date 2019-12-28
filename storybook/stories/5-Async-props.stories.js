import React from 'react'
import { storiesOf } from '@storybook/react'
import PatablesAsyncProps from './Example/PatablesAsync/AsyncProps'

const stories = storiesOf('PatablesAsync', module)
stories
  .add('Props', () => {
    return (
      <PatablesAsyncProps />
    )
  })
