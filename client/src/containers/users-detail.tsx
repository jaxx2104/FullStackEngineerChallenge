import React from "react"
import styled from "styled-components"

import { style } from "../constants"
import { User } from "../types/user"
import Button from "../components/button"
import FormInput from "../components/form-input"
import FormCheckbox from "../components/form-checkbox"

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
  handleInputValue: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void
  handleCreateUser: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  handleDeleteUser: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  handleUpdateUser: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  selectedUser: User
}

const UsersDetail = (props: Props) => {
  const {
    isUpdate,
    handleInputValue,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    selectedUser
  } = props
  return (
    <Content>
      <ContentWrap>
        <FormInput
          type="text"
          name="Name"
          placeholder="name"
          capture={e => handleInputValue(e, "name")}
          value={selectedUser.name}
        />
        <FormInput
          type="text"
          name="Email"
          placeholder="Email"
          capture={e => handleInputValue(e, "email")}
          value={selectedUser.email}
        />
        <FormCheckbox
          name="Admin"
          isChecked={selectedUser.is_admin}
          key={selectedUser._id}
        />
        <div>
          {isUpdate ? (
            <React.Fragment>
              <Button onClick={handleDeleteUser}>Delete</Button>
              <Button onClick={handleUpdateUser}>Update</Button>
            </React.Fragment>
          ) : (
            <Button onClick={handleCreateUser}>Create</Button>
          )}
        </div>
      </ContentWrap>
    </Content>
  )
}

export default UsersDetail
