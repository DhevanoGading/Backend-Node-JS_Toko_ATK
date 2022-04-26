'use strict'

const express = require("express")
const pegawaiController = require('../controllers/pegawai.controller')
const router = new express.Router()
const { auth } = require('../auth/auth')

router.get("/getPegawai", auth, pegawaiController.index)
router.get("/getIdPegawai/:id", auth, pegawaiController.getId)
router.post("/addPegawai", auth, pegawaiController.tambah)
router.delete("/dropPegawai/:idPegawai", auth, pegawaiController.hapus)
router.put("/updatePegawai/:idPegawai", auth, pegawaiController.ubah)

router.post("/loginPegawai", pegawaiController.login)

module.exports = router