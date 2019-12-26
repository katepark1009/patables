import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info';

const style = {
  padding: '20px 15px 5px 30px',
  fontFamily: 'Montserrat, sans-serif'
}　
//Default header
const storybookStyling = (storyFn) => {
  const { props } = storyFn()
  // let storyComponent = props.children.length? '': props.context.name
  return (
    <div>
      <div>
      <h2 style={style}>PaTables</h2>
        <hr/>
        { storyFn() }
      </div>
    </div>
  )
}

addParameters({
  options: {
    name: 'PaTables',
    isFullscreen: false,
    showPanel: true,
    panelPosition: 'right',
    // more configuration here
  },
});

addDecorator(
  withInfo({
    header: false,
    styles: {
      infoBody: {
        //fontFamily: 'Montserrat, sans-serif', 
      },
      propTableHead: {
        fontSize: '1.2rem' 
      }
    }
  })
);
addDecorator(storybookStyling);

// automatically import all files ending in *.stories.js
configure(require.context('../storybook/stories', true, /\.stories\.js$/), module);
