'use strict'

const db = require('../db')

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

        if (!namaUser, !alamatUser) {
            res.status(402).json({
                message: 'Data harus diisi!'
            })
        } else {
            return db.query(`INSERT INTO user SET?`, { namaUser, alamatUser }, (error, results) => {
                if (error) throw (error)
                res.json({
                    message: "berhasil menambahkan data",
                    namaUser: namaUser,
                    alamatUser: alamatUser,
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
        const { namaUser, alamatUser } = req.body

        db.query(`UPDATE user SET ? WHERE idUser = '${idUser}'`, { namaUser, alamatUser }, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil update data",
                results: results
            })
        })
    },
}