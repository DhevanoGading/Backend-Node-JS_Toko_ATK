'use strict'

const { append } = require('express/lib/response')
const db = require('../db')

module.exports = {
    index: (req, res) => {

        const sql = 'select * from transaksi transaksi,detailtransaksi,user,produk where user.idUser = transaksi.idUser and detailtransaksi.idTransaksi = transaksi.idTransaksi and produk.idProduk = detailtransaksi.idProduk';

        db.query(sql, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menampilkan data",
                data: results
            })
        })
    },
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from transaksi join user on transaksi.idUser = user.idUser where idTransaksi = '${id}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results,
            });
        });
    },
    tambahTransaksi: (req, res) => {

        let current = new Date().toISOString().split("T")[0]

        let idUser = req.body.idUser
        let tanggalTransaksi = current

        db.query(`INSERT INTO transaksi SET?`, { idUser, tanggalTransaksi }, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menambahkan data",
                idUser: idUser,
                tanggalTransaksi: tanggalTransaksi
            });
        });
    },
    tambahDetailTransaksi: (req, res) => {
        let detail = {
            idTransaksi: req.body.idTransaksi,
            idProduk: req.body.idProduk,
            jumlahProduk: req.body.jumlahProduk,
            price: req.body.price
        }
        db.query(`INSERT INTO detailtransaksi SET ?`, detail, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menambahkan Detail Transaksi",
                data: results,
            });
        });
    },
    hapus: (req, res) => {
        const id = req.params.id;
        db.query(`delete from transaksi where idTransaksi = ?`, id, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menghapus Data",
                data: results,
            });
        });
    },
    bayar: (req, res) => {
        const id = req.params.idTransaksi;
        let data = {
            nomorTransaksi: req.body.nomorTransaksi,
            statusTransaksi: "LUNAS"
        }

        db.query(`update transaksi set ? where idTransaksi = ${id}`, data, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Mengubah status Data",
                data: results,
            });
        });
    },
}