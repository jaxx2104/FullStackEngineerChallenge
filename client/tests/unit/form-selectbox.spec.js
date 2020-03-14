import React from "react"
import { render } from "@testing-library/react"

import FormSelectbox from "../../src/components/form-selectbox"

describe("FormSelectbox", () => {
  test("props name & placeholder", async () => {
    const { queryByText, queryByPlaceholderText } = render(
      <FormSelectbox
        type="text"
        placeholder="FormInputPlaceholder"
        name="FormSelectboxName"
        items={[]}
      />
    )
    expect(queryByText(/FormSelectboxName/i)).toBeInTheDocument()
  })
})
