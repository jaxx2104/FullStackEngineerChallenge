import { User } from "../types/user"

import { request } from "./api"

export const getUsers = async () => {
  try {
    const results = await request.get("/users")
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createUsers = async ({ _id, name, email, is_admin }: User) => {
  const params = { _id, name, email, is_admin }
  try {
    const results = await request.post("/users", params)
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const deleteUsers = async ({ _id }: User) => {
  try {
    const results = await request.delete("/users", { data: { _id } })
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const updateUsers = async ({ _id, name, email, password, is_admin }) => {
  const params = { _id, name, email, password, is_admin }
  try {
    const results = await request.put("/users", params)
    return results.data.result
  } catch (error) {
    console.error(error)
    return []
  }
}

export const postAuthenticate = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const params = {
    email,
    password
  }
  try {
    const results = await request.post("/users/authenticate", params)
    localStorage.setItem("token", results.data.token)
    return results.data.result
  } catch (error) {
    console.error(error)
    return null
  }
}
