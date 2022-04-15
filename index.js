'use strict'

//inisialisasi
const express = require("express")

//implementasi
const app = express()
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

//menghubungkan ke database
const db = require('./db')
db.connect(error => {
    if (error) throw error
    console.log("mysql connect")
})

//endpoint
app.get("/halo", (req, res) => {

    res.send({
        message: "berhasil menjalankan GET",
        data: {
            description:
                "endpoint menampilkan data"
        }
    })
})

app.use("/toko", require('./routes/pegawai.route'))
app.use("/toko", require('./routes/produk.route'))
app.use("/toko", require('./routes/user.route'))

const port = 8000;
app.listen(port, () => {
    console.log(`Server di port ${port}`)
})
