import styled from "styled-components"

import { style } from "../constants"

const Button = styled.button`
  background-color: #fff;
  border-radius: ${style.RADIUS_SIZE};
  border: 1px solid ${style.BORDER_COLOR};
  cursor: pointer;
  color: #333;
  display: inline-block;
  font-size: ${style.FONT_SIZE};
  font-weight: ${style.FONT_WEIGHT_BOLD};
  height: ${style.UI_SIZE};
  padding: 0 18px;
  text-align: center;
  transition: all 0.15s;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  &:hover {
    background-color: ${style.HOVER_COLOR};
  }
`

export default Button
