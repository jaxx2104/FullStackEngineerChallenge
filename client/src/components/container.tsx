import React from "react"
import styled from "styled-components"

import { style } from "../constants"

const ContainerWrap = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${style.CONTENT_MAX_SIZE};
  min-width: ${style.CONTENT_MIN_SIZE};
  padding: 0 ${style.SPACE_SIZE};
`

interface Props {
  children: React.ReactNode
}

const Container = (props: Props) => {
  return <ContainerWrap>{props.children}</ContainerWrap>
}

export default Container
