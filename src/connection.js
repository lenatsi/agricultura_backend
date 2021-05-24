const mongoose = require("mongoose")

const password = "4UKX16AtBdFfbtwm"
const dbname = "Agricultura"
const user = "AdministratorAgri"
const host = "clusterprincipal.bdg95.mongodb.net"

const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`

module.exports = mongoose.connect(uri,
    {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
    })