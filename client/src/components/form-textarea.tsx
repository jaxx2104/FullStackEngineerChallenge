import React from "react"
import styled from "styled-components"

import { style } from "../constants"

import Label from "./label"

const TextareaWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;

  div {
    display: flex;
    height: ${style.UI_SIZE};
  }
`

const StyledTextarea = styled.textarea`
  border-radius: ${style.RADIUS_SIZE};
  border: 1px solid ${style.BORDER_COLOR};
  font-size: ${style.FONT_SIZE};
  height: 200px;
  margin: 0 ${style.SPACE_SIZE};
  padding: ${style.SPACE_SIZE};
`

interface Props {
  capture: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  name: string
  placeholder: string
  value?: string
}

const FormTextarea = (props: Props) => {
  const { capture, name, placeholder, value } = props
  return (
    <TextareaWrap>
      <div>
        <Label>{name}</Label>
      </div>
      <StyledTextarea
        name={name}
        placeholder={placeholder}
        onChange={capture}
        value={value}
      />
    </TextareaWrap>
  )
}

export default FormTextarea
