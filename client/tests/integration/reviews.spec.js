import React from "react"
import { render } from "@testing-library/react"

import { defaultReview } from "../../src/types/review"
import { defaultUser } from "../../src/types/user"
import Layout from "../../src/containers/layout"
import Menu from "../../src/components/menu"
import ReviewsDetail from "../../src/containers/reviews-detail"

const setup = ({ isUpdate, isAdmin }) => {
  const loggedInUser = JSON.parse(JSON.stringify(defaultUser))
  loggedInUser.is_admin = isAdmin
  return render(
    <Layout isAuth={true} loggedInUser={defaultUser}>
      <Menu items={[defaultReview]} loggedInUser={defaultUser} />
      <ReviewsDetail
        selectedReview={defaultReview}
        loggedInUser={loggedInUser}
        users={[defaultUser]}
        isUpdate={isUpdate}
      />
    </Layout>
  )
}

describe("Reviews", () => {
  test("Employees cannot create reviews", async () => {
    const { queryByText } = setup({ isAdmin: false, isUpdate: false })
    expect(queryByText("Create")).toBeNull()
    expect(queryByText("Delete")).toBeNull()
    expect(queryByText("Update")).toBeNull()
  })

  test("Employees can update reviews / cannot delete reviews", async () => {
    const { queryByText } = setup({ isAdmin: false, isUpdate: true })
    expect(queryByText("Create")).toBeNull()
    expect(queryByText("Delete")).toBeNull()
    expect(queryByText("Update")).toBeInTheDocument()
  })

  test("Admins can create reviews", async () => {
    const { queryByText } = setup({ isAdmin: true, isUpdate: false })
    expect(queryByText("Create")).toBeInTheDocument()
    expect(queryByText("Delete")).toBeNull()
    expect(queryByText("Update")).toBeNull()
  })

  test("EmplAdmins can delete and update reviews", async () => {
    const { queryByText } = setup({ isAdmin: true, isUpdate: true })
    expect(queryByText("Create")).toBeNull()
    expect(queryByText("Delete")).toBeInTheDocument()
    expect(queryByText("Update")).toBeInTheDocument()
  })

  test("reviewer and reviewee selectbox when admin user is enable", async () => {
    const { queryByLabelText } = setup({ isAdmin: false, isUpdate: false })
    const revieweeSelectbox = queryByLabelText("Reviewee")
    const reviewerSelectbox = queryByLabelText("Reviewer")
    expect(revieweeSelectbox.disabled).toBe(true)
    expect(reviewerSelectbox.disabled).toBe(true)
  })

  test("reviewer and reviewee selectbox when employee user is disable", async () => {
    const { queryByLabelText } = setup({ isAdmin: true, isUpdate: true })
    const revieweeSelectbox = queryByLabelText("Reviewee")
    const reviewerSelectbox = queryByLabelText("Reviewer")
    expect(revieweeSelectbox.disabled).toBe(false)
    expect(reviewerSelectbox.disabled).toBe(false)
  })
})
