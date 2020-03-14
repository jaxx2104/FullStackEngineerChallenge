import React from "react"
import styled from "styled-components"

import { style } from "../constants"
import { User } from "../types/user"
import { Review } from "../types/review"

import Label from "./label"

const SelectWrap = styled.div`
  margin: auto 0;
`

const StyledSelect = styled.select`
  border-radius: ${style.RADIUS_SIZE};
  border: 1px solid ${style.BORDER_COLOR};
  font-size: ${style.FONT_SIZE};
  height: ${style.UI_SIZE};
  margin: ${style.SPACE_SIZE};
  padding: ${style.SPACE_SIZE};
  width: 200px;
`

interface Props {
  capture: (event: React.ChangeEvent<HTMLSelectElement>) => void
  isDisabled: boolean
  name: string
  items: (User | Review)[]
  value: string
}

const FormSelectbox = (props: Props) => {
  const { capture, isDisabled, name, items, value } = props
  return (
    <SelectWrap>
      <Label htmlFor={name}>{name}</Label>
      <StyledSelect
        id={name}
        value={value}
        disabled={isDisabled}
        onChange={capture}
      >
        <option value="" />
        {items.map((item, i) => {
          return (
            <option key={i} value={item._id}>
              {item.name}
            </option>
          )
        })}
      </StyledSelect>
    </SelectWrap>
  )
}

export default FormSelectbox
