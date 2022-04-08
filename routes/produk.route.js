'use stric'

const express = require('express')
const produkController = require('../controllers/produk.controller')
const router = new express.Router()

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

router.get("/getProduk", produkController.index)
router.get("/getIdProduk/:id", produkController.getId)
router.post("/addProduk", upload.single("fotoProduk"), produkController.tambah)
router.put("/updateProduk/:id", upload.single("fotoProduk"), produkController.update)
router.delete("/dropProduk/:idProduk", produkController.hapus)

module.exports = router