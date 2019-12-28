import React from 'react'
import { storiesOf } from '@storybook/react'
import Props from './Example/Patables/Props'

const stories = storiesOf('Patables', module)
stories
  .add('Props', () => {
    return (
      <Props />
    )
  })
