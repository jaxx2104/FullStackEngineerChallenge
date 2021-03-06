import React from "react"
import { render } from "@testing-library/react"

import { defaultUser } from "../../src/types/user"
import Layout from "../../src/containers/layout"
import Menu from "../../src/components/menu"
import UserssDetail from "../../src/containers/users-detail"

const setup = ({ isUpdate, isAdmin }) => {
  const loggedInUser = JSON.parse(JSON.stringify(defaultUser))
  loggedInUser.is_admin = isAdmin
  return render(
    <Layout isAuth={true} loggedInUser={loggedInUser}>
      <Menu items={[defaultUser]} loggedInUser={defaultUser} />
      <UserssDetail
        selectedUser={defaultUser}
        loggedInUser={loggedInUser}
        users={[defaultUser]}
        isUpdate={isUpdate}
      />
    </Layout>
  )
}

describe("Reviews", () => {
  test("Employees cannot create users", async () => {
    const { queryByText } = setup({ isAdmin: false, isUpdate: false })
    expect(queryByText("Create")).toBeNull()
    expect(queryByText("Delete")).toBeNull()
    expect(queryByText("Update")).toBeNull()
  })

  test("Employees can update users / cannot delete users", async () => {
    const { queryByText } = setup({ isAdmin: false, isUpdate: true })
    expect(queryByText("Create")).toBeNull()
    expect(queryByText("Delete")).toBeNull()
    expect(queryByText("Update")).toBeInTheDocument()
  })

  test("Admins can create users", async () => {
    const { queryByText } = setup({ isAdmin: true, isUpdate: false })
    expect(queryByText("Create")).toBeInTheDocument()
    expect(queryByText("Delete")).toBeNull()
    expect(queryByText("Update")).toBeNull()
  })

  test("Admins can delete and update users", async () => {
    const { queryByText } = setup({ isAdmin: true, isUpdate: true })
    expect(queryByText("Create")).toBeNull()
    expect(queryByText("Delete")).toBeInTheDocument()
    expect(queryByText("Update")).toBeInTheDocument()
  })
})
