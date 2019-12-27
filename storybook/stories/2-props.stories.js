import React from 'react'
import { storiesOf } from '@storybook/react'
import Props from './Example/Props'

const stories = storiesOf('PaTables', module)
stories
  .add('Props', () => {
    return (
      <Props />
    )
  })
