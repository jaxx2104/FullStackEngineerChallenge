import * as jwt from "jsonwebtoken"
import * as config from "config"
import { User } from "../types/user"

const verifytoken = (req, res, next) => {
  if (config.get("app_authentication")) {
    const jwtToken = req.headers["x-access-token"]
    if (!jwtToken)
      return res.status(401).send({
        response: "No Token Found!"
      })
    try {
      const extractedData = jwt.verify(
        jwtToken,
        config.get("app_jwttoken")
      ) as { loggedInUser: User }
      if (extractedData.loggedInUser) {
        //saving verified jwt in local memory to use next
        res.locals.user = extractedData.loggedInUser.is_admin
        next()
      }
    } catch (e) {
      res.status(400).send({
        response: "Invalid Token"
      })
    }
  } else {
    //
    res.locals.user = "db-operation-required"
    next()
  }
}

export default verifytoken
