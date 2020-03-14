import * as express from "express"
import * as bcrypt from "bcrypt"
import * as config from "config"
import * as jwt from "jsonwebtoken"
const router = express.Router()

import { LoggingInUser } from "../types/user"
import { UserModel, authenticateValidation, inputValidate } from "../model/user"
import verifytoken from "../middleware/auth"

router.post("/authenticate", async (req, res) => {
  // validation check
  const { error } = authenticateValidation(req.body)
  if (error) {
    res.status(400).send({ response: error })
    return
  }
  // find user
  const { email, password }: LoggingInUser = req.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(400).send({
      response: "No user found"
    })
    return
  }
  // crypt password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.status(400).send({
      response: "Password didn't match"
    })
    return
  }
  const token = jwt.sign({ loggedInUser: user }, config.get("app_jwttoken"))
  res.status(200).send({
    token: token,
    result: user
  })
  return
})

router.post("/", verifytoken, async (req, res) => {
  const salt = await bcrypt.genSalt(config.get("app_salt"))
  const encryptPassword = await bcrypt.hash("P@ssw0rd", salt)
  const input = {
    name: req.body.name,
    email: req.body.email,
    password: encryptPassword,
    is_admin: req.body.is_admin
  }

  // validation check
  const { error } = inputValidate(input)
  console.log(error)
  if (error) {
    res.status(422).send({
      status: "failed",
      result: "validation error",
      response: error
    })
    return
  }

  const user = new UserModel(input)
  await user.save()

  const users = await UserModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: users
  })
})

router.get("/", verifytoken, async (req, res) => {
  const users = await UserModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: users
  })
})

router.delete("/", verifytoken, async (req, res) => {
  const user = await UserModel.findById(req.body._id)
  if (!user) {
    res.status(400).send({
      response: "No user found"
    })
    return
  }
  await UserModel.deleteOne({ _id: user._id })
  const users = await UserModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: users
  })
})

router.put("/", verifytoken, async (req, res) => {
  const input = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin
  }

  // validation check
  const { error } = inputValidate(input)
  console.log(error)
  if (error) {
    res.status(400).send(error)
    return
  }

  // find user
  const user = await UserModel.findById(req.body._id)
  if (!user) {
    res.status(400).send("No user found")
    return
  }

  Object.assign(user, input)
  await user.save()

  const users = await UserModel.find()
    .limit(100)
    .sort({ name: 1 })

  res.status(200).send({
    result: users
  })
})

export default router
