import React from "react"
import styled from "styled-components"

import { style } from "../constants"

import Label from "./label"

const CheckboxWrap = styled.div`
  height: ${style.UI_SIZE};
  > * {
    height: ${style.UI_SIZE};
    vertical-align: middle;
  }
`

interface Props {
  isChecked: boolean
  name: string
}

const FormCheckbox = (props: Props) => {
  const { isChecked, name } = props
  return (
    <CheckboxWrap>
      <Label htmlFor={name}>{name}</Label>
      <input type="checkbox" id={name} defaultChecked={isChecked} />
    </CheckboxWrap>
  )
}

export default FormCheckbox
