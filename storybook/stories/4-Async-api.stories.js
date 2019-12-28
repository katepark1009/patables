import React from 'react'
import { storiesOf } from '@storybook/react'
import PatablesAsyncApi from './Example/PatablesAsync/AsyncApi'

const stories = storiesOf('PatablesAsync', module)
stories
  .add('API', () => {
    return (
      <PatablesAsyncApi />
    )
  })
