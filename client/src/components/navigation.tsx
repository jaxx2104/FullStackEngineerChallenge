import React from "react"
import Link from "next/link"
import styled from "styled-components"

import { style } from "../constants"
import { User } from "../types/user"

import Container from "./container"
import NavigationAuth from "./navigation-auth"

const NavigationWrap = styled.nav`
  background-color: #333;
  color: white;
  padding: ${style.SPACE_SIZE} 0;
  position: sticky;
  top: 0;
  width: 100%;
  > * {
    align-items: center;
  }
`

const Menu = styled.a`
  cursor: pointer;
  font-weight: ${style.FONT_WEIGHT_BOLD};
  margin: auto 20px;
  display: inline-block;

  &:hover {
    color: ${style.HOVER_COLOR};
  }
`

interface Props {
  handleLoggingInUser: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
  handleLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  isAuth: boolean
  loggedInUser: User
}

const Navigation = (props: Props) => {
  const {
    handleLoggingInUser,
    handleLogin,
    handleLogout,
    isAuth,
    loggedInUser
  } = props
  return (
    <NavigationWrap>
      <Container>
        <Link href="/">
          <Menu>PayPay</Menu>
        </Link>
        <NavigationAuth
          handleLoggingInUser={handleLoggingInUser}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          isAuth={isAuth}
          loggedInUser={loggedInUser}
        />
      </Container>
    </NavigationWrap>
  )
}

export default Navigation
