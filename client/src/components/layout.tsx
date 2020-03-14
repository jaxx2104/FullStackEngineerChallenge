import React from "react"
import { createGlobalStyle } from "styled-components"

import { style } from "../constants"
import { User } from "../types/user"

import Container from "./container"
import Navigation from "./navigation"
import NotAuthenticated from "./unauthenticated"

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: ${style.BACKGROUND_COLOR};
    color: ${style.TEXT_COLOR};
    font-family: ${style.FONT_FAMILY}, sans-serif;
    font-weight: ${style.FONT_WEIGHT};
    font-size: ${style.FONT_SIZE};
    margin: 0;
  }
`

interface Props {
  children: React.ReactNode
  handleLoggingInUser: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
  handleLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  isAuth: boolean
  loggedInUser: User
}

const Layout = (props: Props) => {
  const {
    children,
    handleLoggingInUser,
    handleLogin,
    handleLogout,
    isAuth,
    loggedInUser
  } = props

  return (
    <React.Fragment>
      <GlobalStyle />
      <Navigation
        handleLoggingInUser={handleLoggingInUser}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isAuth={isAuth}
        loggedInUser={loggedInUser}
      />
      <Container>{isAuth ? children : <NotAuthenticated />}</Container>
    </React.Fragment>
  )
}

export default Layout
