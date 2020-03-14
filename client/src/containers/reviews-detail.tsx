import React from "react"
import styled from "styled-components"

import Button from "../components/button"
import FormInput from "../components/form-input"
import FormTextarea from "../components/form-textarea"
import Selectbox from "../components/form-selectbox"

import { style } from "../constants"
import { Review } from "../types/review"
import { User } from "../types/user"

const Content = styled.div`
  flex: 1;
`

const ContentWrap = styled.div`
  padding: 20px;
  width: 100%;

  > * {
    padding: ${style.SPACE_SIZE} 20px;
  }
`

interface Props {
  isUpdate: boolean
  loggedInUser: User
  users: User[]
  handleInputValue: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    key: string,
    subKey?: string
  ) => void
  handleCreateReview: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  handleDeleteReview: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  handleUpdateReview: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  selectedReview: Review
}

const ReviewsDetail = (props: Props) => {
  const {
    handleCreateReview,
    handleDeleteReview,
    handleInputValue,
    handleUpdateReview,
    isUpdate,
    loggedInUser,
    selectedReview,
    users
  } = props
  return (
    <Content>
      <ContentWrap>
        <FormInput
          type="text"
          name="Name"
          placeholder="Name"
          capture={e => handleInputValue(e, "name")}
          value={selectedReview.name}
        />
        <Selectbox
          name="Reviewer"
          capture={e => handleInputValue(e, "reviewer_id")}
          items={users}
          value={selectedReview.reviewer_id}
          isDisabled={!loggedInUser.is_admin}
        />
        <Selectbox
          name="Reviewee"
          capture={e => handleInputValue(e, "reviewee_id")}
          items={users}
          value={selectedReview.reviewee_id}
          isDisabled={!loggedInUser.is_admin}
        />
        <FormTextarea
          name="Performance"
          placeholder="Performance"
          capture={e => handleInputValue(e, "review", "performance")}
          value={selectedReview.review.performance}
        />
        <FormTextarea
          name="Quality"
          placeholder="Quality"
          capture={e => handleInputValue(e, "review", "quality")}
          value={selectedReview.review.quality}
        />
        <FormTextarea
          name="Job Knowledge"
          placeholder="Job Knowledge"
          capture={e => handleInputValue(e, "review", "job_knowledge")}
          value={selectedReview.review.job_knowledge}
        />
        <FormTextarea
          name="Problem Solving"
          placeholder="Problem Solving"
          capture={e => handleInputValue(e, "review", "problem_solving")}
          value={selectedReview.review.problem_solving}
        />
        <div>
          {isUpdate ? (
            <React.Fragment>
              <Button onClick={handleDeleteReview}>Delete</Button>
              <Button onClick={handleUpdateReview}>Update</Button>
            </React.Fragment>
          ) : (
            <Button onClick={handleCreateReview}>Create</Button>
          )}
        </div>
      </ContentWrap>
    </Content>
  )
}

export default ReviewsDetail
