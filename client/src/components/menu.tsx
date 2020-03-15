import React from "react"
import styled from "styled-components"

import { style } from "../constants"
import { User } from "../types/user"
import { Review } from "../types/review"

const MenuWrap = styled.div`
  width: 220px;
`

const MenuItem = styled.div`
  border-bottom: 1px solid ${style.BORDER_COLOR};
  cursor: pointer;
  padding: 20px;
  transition: all 0.15s;

  &:hover {
    background-color: ${style.HOVER_COLOR};
  }
`

interface Props {
  handleClickAdd?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleClickMenu?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: User | Review
  ) => void
  items: (User | Review)[]
  loggedInUser: User
}

const Menu = (props: Props) => {
  const { handleClickMenu, handleClickAdd, items, loggedInUser } = props
  return (
    <MenuWrap>
      {items.map((item, i) => (
        <MenuItem key={i} onClick={e => handleClickMenu(e, item)}>
          {item.name}
        </MenuItem>
      ))}
      {loggedInUser.is_admin && (
        <MenuItem onClick={handleClickAdd}>➕</MenuItem>
      )}
    </MenuWrap>
  )
}

export default Menu
