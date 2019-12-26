import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '@emotion/styled'
import Api from './Example/Api'

const StyledSection = styled.div`
  font-family: 'Montserrat', sans-serif;
  margin: 0 25px;
`

storiesOf('Docs', module).add('API', () => (
  <StyledSection className='col-10'>
    <Api />
  </StyledSection>
), {
  info: {
    disable: true
  }
})
