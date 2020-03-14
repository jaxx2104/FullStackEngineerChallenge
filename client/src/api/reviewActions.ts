import { request } from "./api"

export const getReviews = async () => {
  const results = await request.get("/reviews")
  return results.data.result
}

export const createReviews = async ({
  _id,
  name,
  reviewer_id,
  reviewee_id,
  review
}) => {
  const params = { _id, name, reviewer_id, reviewee_id, review }
  const results = await request.post("/reviews", params)
  return results.data.result
}

export const deleteReviews = async ({ _id }) => {
  const results = await request.delete("/reviews", { data: { _id } })
  return results.data.result
}

export const updateReviews = async ({
  _id,
  name,
  reviewer_id,
  reviewee_id,
  review
}) => {
  const params = { _id, name, reviewer_id, reviewee_id, review }
  const results = await request.put("/reviews", params)
  return results.data.result
}
