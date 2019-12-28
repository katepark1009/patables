import React from 'react'
import { storiesOf } from '@storybook/react'
import ExamplePatablesAsync from './Example/PatablesAsync/ExampleAsync'

const stories = storiesOf('PatablesAsync', module)
stories
  .add('Example', () => {
    return (
      <ExamplePatablesAsync />
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
