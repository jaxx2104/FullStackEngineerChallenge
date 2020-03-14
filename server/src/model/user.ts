import * as mongoose from "mongoose"
import * as Joi from "joi"
const Schema = mongoose.Schema

interface User extends mongoose.Document {
  name: string
  email: string
  password: string
  date: Date
  is_admin: boolean
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  is_admin: {
    type: Boolean,
    required: true
  }
})
export const UserModel = mongoose.model<User>("users", userSchema)

export const inputValidate = inputobject => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    is_admin: Joi.boolean().required()
  }
  return Joi.validate(inputobject, schema)
}

export const authenticateValidation = inputobject => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  }
  return Joi.validate(inputobject, schema)
}
