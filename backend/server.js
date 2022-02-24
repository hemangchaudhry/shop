const app = require("./app")
const connectDatabase = require("./config/database")

const dotenv = require("dotenv")

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.message)
  console.log("shutting down server due to uncaught exceptions")
  process.exit(1)
})

// setting up config file
dotenv.config({ path: "backend/config/config.env" })

// connect to database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
  console.log("server on port 4000")
})

// handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(err.message)
  console.log("shutting down server due to unhandle promise rejection")
  server.close(() => {
    process.exit(1)
  })
})
