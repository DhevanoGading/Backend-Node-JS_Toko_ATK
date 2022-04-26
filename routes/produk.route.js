'use stric'

const express = require('express')
const produkController = require('../controllers/produk.controller')
const router = new express.Router()
const { auth } = require('../auth/auth')

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({ storage: storage })

router.get("/getProduk", auth, produkController.index)
router.get("/getIdProduk/:id", auth, produkController.getId)
router.post("/addProduk", auth, upload.single("fotoProduk"), produkController.tambah)
router.put("/updateProduk/:id", auth, upload.single("fotoProduk"), produkController.update)
router.delete("/dropProduk/:idProduk", auth, produkController.hapus)

module.exports = router