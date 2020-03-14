import React from "react"
import { render } from "@testing-library/react"

import { defaultReview } from "../../src/types/review"
import { defaultUser } from "../../src/types/user"
import Layout from "../../src/containers/layout"
import Menu from "../../src/components/menu"
import ReviewsDetail from "../../src/containers/reviews-detail"

const setup = ({ isUpdate = false, isAdmin = false }) => {
  const loggedInUser = JSON.parse(JSON.stringify(defaultUser))
  loggedInUser.is_admin = isAdmin
  return render(
    <Layout isAuth={true} loggedInUser={defaultUser}>
      <Menu items={[defaultReview]} />
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

  test("reviewer and reviewee selectbox when admin user is enable", async () => {
    const { queryByLabelText } = setup({ isAdmin: true })
    const revieweeSelectbox = queryByLabelText("Reviewee")
    const reviewerSelectbox = queryByLabelText("Reviewer")
    expect(revieweeSelectbox.disabled).toBe(false)
    expect(reviewerSelectbox.disabled).toBe(false)
  })

  test("reviewer and reviewee selectbox when employee user is disable", async () => {
    const { queryByLabelText } = setup({ isAdmin: false })
    const revieweeSelectbox = queryByLabelText("Reviewee")
    const reviewerSelectbox = queryByLabelText("Reviewer")
    expect(revieweeSelectbox.disabled).toBe(true)
    expect(reviewerSelectbox.disabled).toBe(true)
  })
})
