const Tickets = require("../models/tickets.model")
const conexion = require("../database/mysql")
const { Op } = require("sequelize");


const ticket = {
    insert: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        const { fk_id_user, fk_id_volunteer, description_ } = req.body
        const date_ = new Date()
        try {
            const tkt = await Tickets.create(con);
            const newTkt = await tkt.create({ fk_id_user, fk_id_volunteer, description_, status_: "Pendiente", date_ })
            console.log(newTkt)
            res.json(true)
        } catch (error) {
            console.log(error)
            res.send(false)
        } finally {
            await conexion.cerrar(con);
        }
    }


}

module.exports = ticket