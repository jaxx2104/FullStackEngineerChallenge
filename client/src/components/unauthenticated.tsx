import React from "react"
import styled from "styled-components"

const ContentWrap = styled.div`
  padding: 20px;
`

const NotAuthenticated = () => {
  return (
    <ContentWrap>
      <h2>Authentication Information</h2>
      <p>Admin</p>
      <li>email : admin@paypay.com</li>
      <li>password : P@ssw0rd</li>
      <p>Employee</p>
      <li>email : user1@paypay.com</li>
      <li>password : P@ssw0rd</li>
    </ContentWrap>
  )
}

export default NotAuthenticated
