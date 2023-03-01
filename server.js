const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const db = require("./router")

const kendaraan = require("./kendaraan")
const sewa = require("./sewa")
const admin = require("./admin")
const user = require("./user")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}))



app.use(kendaraan)
app.use(sewa)
app.use(admin)
app.use(user)

app.listen(8000, () => {
    console.log("server run on port 8000")
})