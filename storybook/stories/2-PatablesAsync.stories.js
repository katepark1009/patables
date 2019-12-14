import React from 'react'
import { storiesOf } from '@storybook/react'
import ExampleAsync from './Example/ExampleAsync'

const stories = storiesOf('PaTables', module)
stories
  .add('PaTablesAsync', () => {
    return (
      <ExampleAsync />
    )
  }, {
    info: {
      inline: true,
      text: `
              ## PaTablesAsync

              Check out official Docs for the example. 
              [Link to PaTablesAsync Basic example](https://www.npmjs.com/package/patables#the-basics)
            `
    }
  })
