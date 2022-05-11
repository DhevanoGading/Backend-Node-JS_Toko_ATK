'use strict'

const express = require("express")
const pegawaiController = require('../controllers/pegawai.controller')
const router = new express.Router()
// const { auth } = require('../auth/auth')

router.get("/getPegawai", pegawaiController.index)
router.get("/getIdPegawai/:id", pegawaiController.getId)
router.post("/pegawai", pegawaiController.post)
router.post("/addPegawai", pegawaiController.tambah)
router.delete("/dropPegawai/:idPegawai", pegawaiController.hapus)
router.put("/updatePegawai/:idPegawai", pegawaiController.ubah)

// router.post("/loginPegawai", pegawaiController.login)

module.exports = router