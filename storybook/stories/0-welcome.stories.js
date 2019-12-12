import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '@emotion/styled'

const Title = styled.h4`
  font-family: 'Montserrat', sans-serif;
  padding: 20px 10px 10px 0px;
`
const StyledSection = styled.div`
  font-family: 'Montserrat', sans-serif;
  margin: 0 25px;
`

storiesOf('Welcome', module).add('to Storybook', () => (
  <StyledSection className='col-10'>
    <img src='https://badge.fury.io/js/patables.svg' alt='badge' />
    <Title> Welcome to 'PaTables' Storybook</Title>
    <p>Can't find an easy way to organize your table data without sacrificing all the design? Neither could we.</p>
    <p>Introducing PaTables, a react render prop library that empowers you to handle the look and feel while we take care of the rest. </p>
    <p>PaTables is small performant library that fits nicely into any react project.</p>

    <ul>
      <li><a href='https://www.npmjs.com/package/patables#docs'>Official Docs</a></li>
      <li><a href='https://github.com/williampruden/patables'>Github</a></li>
    </ul>
  </StyledSection>
), {
  info: {
    disable: true
  }
})
