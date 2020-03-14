import React from "react"
import styled from "styled-components"

import { style } from "../constants"

import Label from "./label"

const InputWrap = styled.div`
  margin: auto 0;
`

const StyledInput = styled.input`
  border-radius: ${style.RADIUS_SIZE};
  border: 1px solid ${style.BORDER_COLOR};
  font-size: ${style.FONT_SIZE};
  height: ${style.UI_SIZE};
  margin: 0 ${style.SPACE_SIZE};
  padding: 0 ${style.SPACE_SIZE};
  width: 200px;
`

interface Props {
  capture: (event: React.ChangeEvent<HTMLInputElement>, key: string) => void
  name: string
  placeholder: string
  type: string
  value?: string
}

const FormInput = (props: Props) => {
  const { type, capture, name, placeholder, value } = props
  return (
    <InputWrap>
      <Label>{name}</Label>
      <StyledInput
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={e => capture(e, name)}
        value={value}
      />
    </InputWrap>
  )
}

export default FormInput
