const Reports = require("../models/reports.model")
const conexion = require("../database/mysql")
const { Op } = require("sequelize");


const reports = {
    insert: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        const { fk_id_event, fk_id_volunteer, description_ } = req.body
        const date_ = new Date()
        try {
            const rprt = await Reports.create(con);
            const newRprt = await rprt.create({ fk_id_event, fk_id_volunteer, description_, status_: "Pendiente", date_ })
            console.log(newRprt)
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        } finally {
            await conexion.cerrar(con);
        }
    },
    getAll: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        try {
            const rprt = await Reports.create(con);
            const rprtFind = await rprt.findAll()
            console.log(rprtFind)
            res.json(rprtFind)
        } catch (error) {
            console.log(error)
            res.json(false)
        } finally {
            await conexion.cerrar(con);
        }
    },

}

module.exports = reports