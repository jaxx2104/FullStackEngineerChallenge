import React from "react"
import { render } from "@testing-library/react"

import FormCheckbox from "../../src/components/form-checkbox"

describe("FormCheckbox", () => {
  test("props name & placeholder", async () => {
    const isChecked = true
    const { queryByText } = render(
      <FormCheckbox isChecked={isChecked} name="FormCheckboxName" />
    )
    expect(queryByText(/FormCheckboxName/i)).toBeInTheDocument()
  })
})
