'use strict'

const express = require("express")
const userController = require('../controllers/user.controller')
const router = new express.Router()

router.get('/getUser', userController.index)
router.get('getIdUser/:id', userController.getId)
router.post('/addUser', userController.tambah)
router.delete('/dropUser/:idUser', userController.hapus)
router.put('/updateUser/:idUser', userController.ubah)

module.exports = router