'use strict'

const db = require('../db')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const secret = '(*&^%$#@!)'

module.exports = {
    index: (req, res) => {
        const sql = 'select * from pegawai'

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
        db.query(`select * from pegawai where idPegawai = '${id}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results,
            });
        });
    },
    post: (req, res) => {
        let find = req.body.find
        let sql = "select * from pegawai where idPegawai like '%" + find + "%' or namaPegawai like '%" + find + "%' or alamatPegawai like '%" + find + "%'"
        db.query(sql, (err, results) => {
            if (err) {
                throw err
            } else {
                let response = {
                    count: results.length,
                    pegawai: results
                }

                res.setHeader("Content-Type", "application/json")
                res.send(JSON.stringify(response))
            }
        })
    },
    tambah: (req, res) => {

        let namaPegawai = req.body.namaPegawai
        let alamatPegawai = req.body.alamatPegawai
        let email = req.body.email
        let password = md5(req.body.password)

        if (!namaPegawai || !alamatPegawai) {
            res.status(402).json({
                message: 'Data harus diisi!'
            })
        } else {
            return db.query(`INSERT INTO pegawai SET ?`, { namaPegawai, alamatPegawai, email, password }, (err, result) => {
                if (err) {
                    return res.status(500).json({ err })
                } else {
                    return res.json({
                        message: "Berhasil menambahkan pegawai",
                        data: result
                    })
                }
            })
        }
    },
    hapus: (req, res) => {
        const idPegawai = req.params.idPegawai

        db.query(`DELETE FROM pegawai WHERE idPegawai = ?`, idPegawai, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menghapus data",
                results: results
            })
        })
    },
    ubah: (req, res) => {
        const idPegawai = req.params.idPegawai
        let namaPegawai = req.body.namaPegawai
        let alamatPegawai = req.body.alamatPegawai
        let email = req.body.email
        let password = md5(req.body.password)

        db.query(`UPDATE pegawai SET ? WHERE idPegawai = '${idPegawai}'`, { namaPegawai, alamatPegawai, email, password }, (error, results) => {
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

            let sql = `SELECT * FROM pegawai WHERE email = '${email}' AND password = '${password}'`

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