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
        const { namaPegawai, alamatPegawai, email, password } = req.body

        db.query(`UPDATE pegawai SET ? WHERE idPegawai = '${idPegawai}'`, { namaPegawai, alamatPegawai, email, password }, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil update data",
                results: results
            })
        })
    },

    auth: (req, res) => {

        let email = req.body.email
        let password = md5(req.body.password)

        let sql = `SELECT * FROM pegawai WHERE email = '${email}' AND password = ${password}`

        if (sql) {
            let payload = JSON.stringify(sql)

            let token = jwt.sign(payload, secret)
            res.json({
                logged: true,
                data: sql,
                token: token
            })
        } else {
            res.json({
                logged: false,
                message: "Invalid email or password"
            })
        }
    }
}