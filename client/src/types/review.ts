export type ReviewChild = {
  performance: string
  quality: string
  job_knowledge: string
  problem_solving: string
}

export type Review = {
  _id: string
  name: string
  reviewer_id: string
  reviewee_id: string
  review: ReviewChild
}

export const defaultReview = {
  _id: "",
  name: "",
  reviewer_id: "",
  reviewee_id: "",
  review: {
    performance: "",
    quality: "",
    job_knowledge: "",
    problem_solving: ""
  }
}
