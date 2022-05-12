'use strict'

const db = require('../db')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const secret = '(*&^%$#@!)'

module.exports = {
    index: (req, res) => {
        const sql = 'select * from user'

        db.query(sql, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menampilkan data",
                results: results
            })
        })
    },
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from user where idUser = '${id}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results,
            });
        });
    },
    tambah: (req, res) => {

        let namaUser = req.body.namaUser
        let alamatUser = req.body.alamatUser
        let email = req.body.email
        let password = md5(req.body.password)

        if (!namaUser, !alamatUser) {
            res.status(402).json({
                message: 'Data harus diisi!'
            })
        } else {
            return db.query(`INSERT INTO user SET?`, { namaUser, alamatUser, email, password }, (error, result) => {
                if (error) throw (error)
                res.json({
                    message: "berhasil menambahkan data",
                    data: result
                })
            })
        }
    },
    hapus: (req, res) => {
        const idUser = req.params.idUser

        db.query(`DELETE FROM user WHERE iduser = ?`, idUser, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menghapus data",
                results: results
            })
        })
    },
    ubah: (req, res) => {
        const idUser = req.params.idUser
        const namaUser = req.body.namaUser
        const alamatUser = req.body.alamatUser
        const email = req.body.email
        const password = md5(req.body.password)

        db.query(`UPDATE user SET ? WHERE idUser = '${idUser}'`, { namaUser, alamatUser, email, password }, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil update data",
                results: results
            })
        })
    },
    login: (req, res) => {

        let email = req.body.email
        let password = md5(req.body.password)

        if (!email || !password) {
            res.status(402).json({
                message: 'username and password cannot be empty.'
            })
        } else {

            let sql = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`

            if (sql) {
                db.query(sql, (error, results) => {
                    let payload = JSON.stringify(sql)

                    let token = jwt.sign(payload, secret)
                    res.json({
                        logged: true,
                        token: token,
                        data: results
                    })
                })
            } else {
                res.json({
                    logged: false,
                    message: "Invalid email or password"
                })
            }
        }
    }
}