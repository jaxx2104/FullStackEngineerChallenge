import React from "react"
import { render } from "@testing-library/react"

import Navigation from "../../src/components/navigation"

describe("Navigation", () => {
  test("unauthenticated", async () => {
    const isAuth = false
    const loggedInUser = { is_admin: false }
    const { queryByText } = render(
      <Navigation isAuth={isAuth} loggedInUser={loggedInUser} />
    )
    expect(queryByText("Performance Review")).toBeNull()
    expect(queryByText("Employee Management")).toBeNull()
    expect(queryByText("Login")).toBeInTheDocument()
  })

  test("authenticated when employee user", async () => {
    const isAuth = true
    const loggedInUser = { is_admin: false }
    const { queryByText } = render(
      <Navigation isAuth={isAuth} loggedInUser={loggedInUser} />
    )
    expect(queryByText("Performance Review")).toBeInTheDocument()
    expect(queryByText("Employee Management")).toBeNull()
    expect(queryByText("Logout")).toBeInTheDocument()
  })

  test("authenticated when admin user", async () => {
    const isAuth = true
    const loggedInUser = { is_admin: true }
    const { queryByText } = render(
      <Navigation isAuth={isAuth} loggedInUser={loggedInUser} />
    )
    expect(queryByText("Performance Review")).toBeInTheDocument()
    expect(queryByText("Employee Management")).toBeInTheDocument()
    expect(queryByText("Logout")).toBeInTheDocument()
  })
})
