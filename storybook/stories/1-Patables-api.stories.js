import React from 'react'
import { storiesOf } from '@storybook/react'
import Api from './Example/Patables/Api'

const stories = storiesOf('Patables', module)
stories
  .add('API', () => {
    return (
      <Api />
    )
  })
