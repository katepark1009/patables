import React from 'react'
import { storiesOf } from '@storybook/react'
import ExamplePatables from './Example/Example'

const stories = storiesOf('Patables', module)
stories
  .add('Examples', () => {
    return (
      <ExamplePatables />
    )
  }, {
    info: {
      inline: true,
      text: `
              ## PaTables 
              
              Check out official Docs for the example. 
              [Link to PaTables Basic example](https://www.npmjs.com/package/patables#the-basics)
            `
    }
  })
