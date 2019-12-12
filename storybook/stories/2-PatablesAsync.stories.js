import React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'

const stories = storiesOf('PaTables', module)
stories
  .add('PaTablesAsync', () => {
    const isMain = select(
      'main',
      [
        true,
        false
      ],
      true
    )
    return (
      <div main={isMain}/>
    )
  }, {
    info: {
      inline: true,
      text: `
              ## PaTablesAsync
            `
    }
  })
