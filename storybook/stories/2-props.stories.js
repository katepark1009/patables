import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '@emotion/styled'
import Props from './Example/Props'

const StyledSection = styled.div`
  font-family: 'Montserrat', sans-serif;
  margin: 0 25px;
`

storiesOf('Patables Docs', module).add('Props', () => (
  <StyledSection className='col-11'>
    <Props />
  </StyledSection>
), {
  info: {
    disable: true
  }
})
