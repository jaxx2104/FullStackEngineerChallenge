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
