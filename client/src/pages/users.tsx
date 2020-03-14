import React, { Component } from "react"
import jwt from "jwt-decode"

import { User, LoggingInUser } from "../types/user"
import {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  postAuthenticate
} from "../api/userActions"
import Layout from "../components/layout"
import UsersDetail from "../containers/users-detail"
import Menu from "../components/menu"

interface State {
  isAuth: boolean
  isUpdate: boolean
  selectedUser: User
  loggingInUser: LoggingInUser
  loggedInUser: User
  users: User[]
}

class Users extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isAuth: false,
      isUpdate: true,
      selectedUser: null,
      loggingInUser: { email: "", password: "" },
      loggedInUser: null,
      users: []
    }
    this.handleLoggingInUser = this.handleLoggingInUser.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleClickMenu = this.handleClickMenu.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleInputValue = this.handleInputValue.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
  }

  async componentDidMount() {
    this.load()
  }

  async getAuth() {
    try {
      const token = localStorage.getItem("token")
      const { loggedInUser }: { loggedInUser: User } = jwt(token)
      this.setState({ loggedInUser, isAuth: !!loggedInUser })
    } catch (error) {
      console.error(error)
    }
  }

  async load() {
    await this.getAuth()
    if (!this.state.isAuth) return
    if (!this.state.loggedInUser.is_admin) {
      location.href = "/"
    }

    try {
      const users = await getUsers()
      const [selectedUser] = users
      this.setState({
        users,
        selectedUser: JSON.parse(JSON.stringify(selectedUser))
      })
    } catch (e) {
      console.error(e)
    }
  }

  async handleLogin(e) {
    e.preventDefault()
    const { email, password } = this.state.loggingInUser
    const user = await postAuthenticate({ email, password })
    if (!user) {
      alert("Please provide valid email and password")
      return
    }
    this.load()
  }

  handleLogout() {
    localStorage.removeItem("token")
    location.href = "/"
  }

  handleClickMenu(
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selectedUser: User
  ) {
    this.setState({
      isUpdate: true,
      selectedUser: JSON.parse(JSON.stringify(selectedUser))
    })
  }

  handleClickAdd() {
    this.setState({
      isUpdate: false,
      selectedUser: {
        _id: "",
        name: "",
        email: "",
        password: "",
        is_admin: false
      }
    })
  }

  async handleCreateUser() {
    try {
      const selectedUser = this.state.selectedUser
      const users = await createUsers(selectedUser)
      this.setState({ users, selectedUser: null })
    } catch (e) {
      console.error(e)
    }
  }

  async handleDeleteUser() {
    try {
      const selectedUser = this.state.selectedUser
      const users = await deleteUsers(selectedUser)
      this.setState({ users, selectedUser: null })
    } catch (e) {
      console.error(e)
    }
  }

  async handleUpdateUser() {
    try {
      const selectedUser = this.state.selectedUser
      const users = await updateUsers(selectedUser)
      this.setState({ users, selectedUser: null })
    } catch (e) {
      console.error(e)
    }
  }

  handleLoggingInUser(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    const loggingInUser = this.state.loggingInUser
    loggingInUser[key] = e.target.value
    this.setState({ loggingInUser })
  }

  handleInputValue(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    const selectedUser = this.state.selectedUser
    selectedUser[name] = e.target.value
    this.setState({ selectedUser })
  }

  render() {
    return (
      <Layout
        handleLoggingInUser={this.handleLoggingInUser}
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        isAuth={this.state.isAuth}
        loggedInUser={this.state.loggedInUser}
      >
        <Menu
          items={this.state.users}
          handleClickAdd={this.handleClickAdd}
          handleClickMenu={this.handleClickMenu}
        />
        {this.state.selectedUser && (
          <UsersDetail
            handleCreateUser={this.handleCreateUser}
            handleDeleteUser={this.handleDeleteUser}
            handleInputValue={this.handleInputValue}
            handleUpdateUser={this.handleUpdateUser}
            isUpdate={this.state.isUpdate}
            selectedUser={this.state.selectedUser}
          />
        )}
      </Layout>
    )
  }
}

export default Users
