import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '@emotion/styled'
import Api from './Example/Api'

const Title = styled.h4`
  font-family: 'Montserrat', sans-serif;
  padding: 20px 10px 10px 0px;
`
const StyledSection = styled.div`
  font-family: 'Montserrat', sans-serif;
  margin: 0 25px;
`

storiesOf('Welcome', module).add('API', () => (
  <StyledSection className='col-10'>
    <img src='https://badge.fury.io/js/patables.svg' alt='badge' />
    <Title> Welcome to 'PaTables' Storybook</Title>
    <Api />
  </StyledSection>
), {
  info: {
    disable: true
  }
})
