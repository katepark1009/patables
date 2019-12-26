import React from 'react'
import { storiesOf } from '@storybook/react'
import ExampleTable from './Example/Example'

const stories = storiesOf('PaTables', module)
stories
  .add('PaTables', () => {
    return (
      <ExampleTable />
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
