import * as express from "express"

import { ReviewModel, inputValidate } from "../model/reviews"
import verifytoken from "../middleware/auth"

const router = express.Router()

router.post("/", verifytoken, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...inputReview } = req.body.review
  const { name, reviewer_id, reviewee_id } = req.body
  const input = {
    name,
    reviewer_id,
    reviewee_id,
    review: inputReview
  }

  // validation check
  const { error } = inputValidate(input)
  if (error) {
    res.status(422).send({
      status: "failed",
      result: "validation error",
      response: error
    })
    return
  }

  const review = new ReviewModel(input)
  await review.save()

  const reviews = await ReviewModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: reviews
  })
})

router.get("/", verifytoken, async (req, res) => {
  const reviews = await ReviewModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: reviews
  })
})

router.delete("/", verifytoken, async (req, res) => {
  const review = await ReviewModel.findById(req.body._id)
  if (!review) {
    res.status(400).send({
      response: "No review found"
    })
    return
  }
  await ReviewModel.deleteOne({ _id: review._id })
  const reviews = await ReviewModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: reviews
  })
})

router.put("/", verifytoken, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...inputReview } = req.body.review
  const { name, reviewer_id, reviewee_id } = req.body
  const input = {
    name,
    reviewer_id,
    reviewee_id,
    review: inputReview
  }
  // validation check
  const { error } = inputValidate(input)
  console.log(error)
  if (error) {
    res.status(400).send(error)
    return
  }

  // find review
  const review = await ReviewModel.findById(req.body._id)
  if (!review) {
    res.status(400).send("No review found")
    return
  }

  Object.assign(review, input)
  await review.save()

  const reviews = await ReviewModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: reviews
  })
})

export default router
