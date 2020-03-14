import React from "react"
import { render } from "@testing-library/react"

import FormTextarea from "../../src/components/form-textarea"

describe("FormTextarea", () => {
  test("props name & placeholder", async () => {
    const { queryByText, queryByPlaceholderText } = render(
      <FormTextarea
        type="text"
        placeholder="FormTextareaPlaceholder"
        name="FormTextareaName"
      />
    )
    expect(queryByText(/FormTextareaName/i)).toBeInTheDocument()
    expect(
      queryByPlaceholderText(/FormTextareaPlaceholder/i)
    ).toBeInTheDocument()
  })
})
