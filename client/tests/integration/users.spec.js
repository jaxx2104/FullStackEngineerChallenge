import React from "react"
import { render } from "@testing-library/react"

import { defaultUser } from "../../src/types/user"
import Layout from "../../src/containers/layout"
import Menu from "../../src/components/menu"
import UserssDetail from "../../src/containers/users-detail"

const setup = ({ isUpdate = false, isAdmin = false }) => {
  const loggedInUser = JSON.parse(JSON.stringify(defaultUser))
  loggedInUser.is_admin = isAdmin
  return render(
    <Layout isAuth={true} loggedInUser={loggedInUser}>
      <Menu items={[defaultUser]} />
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
  test("button when created is Create", async () => {
    const { queryByText } = setup({ isUpdate: false })
    expect(queryByText("Create")).toBeInTheDocument()
    expect(queryByText("Delete")).toBeNull()
    expect(queryByText("Update")).toBeNull()
  })

  test("button when updated is Delete and Update", async () => {
    const { queryByText } = setup({ isUpdate: true })
    expect(queryByText("Create")).toBeNull()
    expect(queryByText("Delete")).toBeInTheDocument()
    expect(queryByText("Update")).toBeInTheDocument()
  })
})
