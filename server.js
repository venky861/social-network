const express = require("express")
const app = express()
const connectionDB = require("./config/db")
const path = require("path")

//db
connectionDB()

// body parser
app.use(express.json({ extended: false }))

//route

app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/posts", require("./routes/api/posts"))

// Server static assest
if (process.env.NODE_ENV === "production") {
  //set static folder

  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}
//Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Port is running on ${PORT}`))
