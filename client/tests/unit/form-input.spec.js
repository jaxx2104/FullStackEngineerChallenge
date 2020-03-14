import React from "react"
import { render } from "@testing-library/react"

import FormInput from "../../src/components/form-input"

describe("FormInput", () => {
  test("props name & placeholder", async () => {
    const { queryByText, queryByPlaceholderText } = render(
      <FormInput
        type="text"
        placeholder="FormInputPlaceholder"
        name="FormInputName"
      />
    )
    expect(queryByText(/FormInputName/i)).toBeInTheDocument()
    expect(queryByPlaceholderText(/FormInputPlaceholder/i)).toBeInTheDocument()
  })
})
