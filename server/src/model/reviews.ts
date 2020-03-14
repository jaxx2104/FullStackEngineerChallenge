import * as mongoose from "mongoose"
import * as Joi from "joi"
const Schema = mongoose.Schema

const childSchema = new Schema({
  performance: {
    type: String,
    required: false
  },
  quality: {
    type: String,
    required: false
  },
  job_knowledge: {
    type: String,
    required: false
  },
  problem_solving: {
    type: String,
    required: false
  }
})

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  reviewer_id: {
    type: String,
    required: false
  },
  reviewee_id: {
    type: String,
    required: false
  },
  review: childSchema,
  date: {
    type: Date,
    default: Date.now
  }
})
export const ReviewModel = mongoose.model("review", reviewSchema)

export const inputValidate = inputobject => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    reviewer_id: Joi.string()
      .optional()
      .allow(""),
    reviewee_id: Joi.string()
      .optional()
      .allow(""),
    review: {
      performance: Joi.string()
        .optional()
        .allow("")
        .max(400),
      quality: Joi.string()
        .optional()
        .allow("")
        .max(400),
      job_knowledge: Joi.string()
        .optional()
        .allow("")
        .max(400),
      problem_solving: Joi.string()
        .optional()
        .allow("")
        .max(400)
    }
  }
  return Joi.validate(inputobject, schema)
}
