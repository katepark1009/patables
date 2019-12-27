import React from 'react'
import { storiesOf } from '@storybook/react'
import Api from './Example/Api'

const stories = storiesOf('PaTables', module)
stories
  .add('API', () => {
    return (
      <Api />
    )
  })
