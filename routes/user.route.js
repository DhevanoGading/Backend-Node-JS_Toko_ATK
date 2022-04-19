'use strict'

const express = require("express")
const userController = require('../controllers/user.controller')
const router = new express.Router()
const auth = require('../auth/auth')

router.get('/getUser', auth, userController.index)
router.get('getIdUser/:id', auth, userController.getId)
router.post('/addUser', auth, userController.tambah)
router.delete('/dropUser/:idUser', auth, userController.hapus)
router.put('/updateUser/:idUser', auth, userController.ubah)

router.post('/auth', userController.auth)

module.exports = router