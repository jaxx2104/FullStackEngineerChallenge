import React, { Component } from "react"
import jwt from "jwt-decode"

import { Review, defaultReview } from "../types/review"
import { User, LoggingInUser } from "../types/user"
import {
  getReviews,
  createReviews,
  updateReviews,
  deleteReviews
} from "../api/reviewActions"
import { getUsers, postAuthenticate } from "../api/userActions"
import Layout from "../containers/layout"
import Menu from "../components/menu"
import ReviewsDetail from "../containers/reviews-detail"

interface State {
  isAuth: boolean
  isUpdate: boolean
  selectedReview: Review
  loggingInUser: LoggingInUser
  loggedInUser: User
  reviews: Review[]
  users: User[]
}

class Reviews extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isAuth: false,
      isUpdate: true,
      selectedReview: null,
      loggingInUser: { email: "", password: "" },
      loggedInUser: null,
      reviews: [],
      users: []
    }
    this.handleLoggingInUser = this.handleLoggingInUser.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleClickMenu = this.handleClickMenu.bind(this)
    this.handleCreateReview = this.handleCreateReview.bind(this)
    this.handleDeleteReview = this.handleDeleteReview.bind(this)
    this.handleInputValue = this.handleInputValue.bind(this)
    this.handleUpdateReview = this.handleUpdateReview.bind(this)
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
    try {
      const [reviews, users] = await Promise.all([getReviews(), getUsers()])
      const [selectedReview] = reviews
      this.setState({
        reviews,
        users,
        selectedReview: JSON.parse(JSON.stringify(selectedReview))
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
    selectedReview: Review
  ) {
    this.setState({
      isUpdate: true,
      selectedReview: JSON.parse(JSON.stringify(selectedReview))
    })
  }

  handleClickAdd() {
    this.setState({
      isUpdate: false,
      selectedReview: defaultReview
    })
  }

  async handleCreateReview() {
    try {
      const selectedReview = this.state.selectedReview
      const reviews = await createReviews(selectedReview)
      this.setState({ reviews, selectedReview: null })
    } catch (e) {
      console.error(e)
    }
  }

  async handleDeleteReview() {
    try {
      const selectedReview = this.state.selectedReview
      const reviews = await deleteReviews(selectedReview)
      this.setState({ reviews, selectedReview: null })
    } catch (e) {
      console.error(e)
    }
  }

  async handleUpdateReview() {
    try {
      const selectedReview = this.state.selectedReview
      const reviews = await updateReviews(selectedReview)
      this.setState({ reviews, selectedReview: null })
    } catch (e) {
      console.error(e)
    }
  }

  handleLoggingInUser(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    const loggingInUser = this.state.loggingInUser
    loggingInUser[key] = e.target.value
    this.setState({ loggingInUser })
  }

  handleInputValue(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    subKey: string
  ) {
    const selectedReview = this.state.selectedReview
    if (!subKey) {
      selectedReview[key] = e.target.value
    } else {
      selectedReview[key][subKey] = e.target.value
    }
    this.setState({ selectedReview })
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
          items={this.state.reviews}
          handleClickAdd={this.handleClickAdd}
          handleClickMenu={this.handleClickMenu}
        />
        {this.state.selectedReview && (
          <ReviewsDetail
            handleCreateReview={this.handleCreateReview}
            handleDeleteReview={this.handleDeleteReview}
            handleInputValue={this.handleInputValue}
            handleUpdateReview={this.handleUpdateReview}
            isUpdate={this.state.isUpdate}
            loggedInUser={this.state.loggedInUser}
            selectedReview={this.state.selectedReview}
            users={this.state.users}
          />
        )}
      </Layout>
    )
  }
}

export default Reviews
