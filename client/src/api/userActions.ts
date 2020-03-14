import { User, LoggingInUser } from "../types/user"

import { request } from "./api"

export const getUsers = async () => {
  const results = await request.get("/users")
  return results.data.result
}

export const createUsers = async ({ _id, name, email, is_admin }: User) => {
  const params = { _id, name, email, is_admin }
  const results = await request.post("/users", params)
  return results.data.result
}

export const deleteUsers = async ({ _id }: User) => {
  const results = await request.delete("/users", { data: { _id } })
  return results.data.result
}

export const updateUsers = async ({
  _id,
  name,
  email,
  password,
  is_admin
}: User) => {
  const params = { _id, name, email, password, is_admin }
  const results = await request.put("/users", params)
  return results.data.result
}

export const postAuthenticate = async ({ email, password }: LoggingInUser) => {
  const params = {
    email,
    password
  }
  const results = await request.post("/users/authenticate", params)
  localStorage.setItem("token", results.data.token)
  return results.data.result
}
