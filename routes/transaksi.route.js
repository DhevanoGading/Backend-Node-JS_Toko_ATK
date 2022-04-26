'use strict'

const express = require("express")
const transaksiController = require('../controllers/transaksi.controller')
const router = new express.Router()

const { auth } = require('../auth/auth')

router.get('/getTransaksi', auth, transaksiController.index)
router.get('/getIdTransaksi/:id', auth, transaksiController.getId)
router.post('/tambahTransaksi', auth, transaksiController.tambahTransaksi)
router.post('/tambahDetail', auth, transaksiController.tambahDetailTransaksi)
router.delete('/toko/hapusTransaksi/:id', auth, transaksiController.hapus)
router.put('/updateTransaksi/:idTransaksi', auth, transaksiController.bayar)

module.exports = router