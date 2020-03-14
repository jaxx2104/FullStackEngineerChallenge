import React from "react"
import styled from "styled-components"
import Link from "next/link"

import { style } from "../constants"
import { User } from "../types/user"

import Button from "./button"
import FormInput from "./form-input"

const AuthWrap = styled.div`
  display: flex;
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

const NavigationAuth = (props: Props) => {
  const {
    handleLoggingInUser,
    handleLogin,
    handleLogout,
    isAuth,
    loggedInUser
  } = props
  return (
    <AuthWrap>
      {!isAuth ? (
        <React.Fragment>
          <FormInput
            type="text"
            name="email"
            placeholder="Email"
            capture={handleLoggingInUser}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            capture={handleLoggingInUser}
          />
          <Button onClick={handleLogin}>Login</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link href="/">
            <Menu>Performance Review</Menu>
          </Link>
          {loggedInUser.is_admin && (
            <Link href="/users">
              <Menu>Employee Management</Menu>
            </Link>
          )}
          <Button onClick={handleLogout}>Logout</Button>
        </React.Fragment>
      )}
    </AuthWrap>
  )
}

export default NavigationAuth
