'use strict'

const express = require("express")
const transaksiController = require('../controllers/transaksi.controller')
const router = new express.Router()

// const { auth } = require('../auth/auth')

router.get('/getTransaksi', transaksiController.index)
router.get('/getIdTransaksi/:id', transaksiController.getId)
router.post('/tambahTransaksi', transaksiController.tambahTransaksi)
router.post('/tambahDetail', transaksiController.tambahDetailTransaksi)
router.delete('/toko/hapusTransaksi/:id', transaksiController.hapus)
router.put('/updateTransaksi/:idTransaksi', transaksiController.bayar)

module.exports = router