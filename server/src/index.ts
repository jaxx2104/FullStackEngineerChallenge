import * as express from "express"
import * as mongoose from "mongoose"
import * as config from "config"

// add middleware
import * as helmet from "helmet"
import * as morgan from "morgan"
import * as cors from "cors"

// add router
import reviewRoute from "./route/reviews"
import userRoute from "./route/users"

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// connecting database
mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)

// connect to database.
mongoose
  .connect(`mongodb://localhost:27017/${config.get("app_database")}`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Database connected successfully..")
  })
  .catch(() => {
    console.log("Unable to connect..")
  })

//default route
app.get("/", (req, res) => {
  res.status(200).send({
    response: "Server is up and running"
  })
})

// registering api endpoint
app.use("/reviews", reviewRoute)
app.use("/users", userRoute)

// starting server
const port = process.env.PORT || 4000
app.listen(port, function() {
  console.log(`App is running on ${port} Port`)
})
