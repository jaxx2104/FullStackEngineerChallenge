import { request } from "./api"

export const getReviews = async () => {
  try {
    const results = await request.get("/reviews")
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createReviews = async ({
  _id,
  name,
  reviewer_id,
  reviewee_id,
  review
}) => {
  const params = { _id, name, reviewer_id, reviewee_id, review }
  try {
    const results = await request.post("/reviews", params)
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const deleteReviews = async ({ _id }) => {
  try {
    const results = await request.delete("/reviews", { data: { _id } })
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const updateReviews = async ({
  _id,
  name,
  reviewer_id,
  reviewee_id,
  review
}) => {
  const params = { _id, name, reviewer_id, reviewee_id, review }
  try {
    const results = await request.put("/reviews", params)
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}
