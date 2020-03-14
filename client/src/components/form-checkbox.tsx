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
  label: string
}

const FormCheckbox = (props: Props) => {
  const { isChecked, label } = props
  return (
    <CheckboxWrap>
      <Label>{label}</Label>
      <input type="checkbox" defaultChecked={isChecked} />
    </CheckboxWrap>
  )
}

export default FormCheckbox
