export type User = {
  _id: string
  name: string
  email: string
  password: string
  is_admin: boolean
}

export type LoggingInUser = {
  email: string
  password: string
}

export const defaultUser = {
  _id: "",
  name: "",
  email: "",
  password: "",
  is_admin: false
}
