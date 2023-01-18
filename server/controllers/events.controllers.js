const Events_ = require("../models/events_.model");

const event_ = {
    create: async (req, res) => {
        const con = await conexion.abrir(req.cookies.session);
        const { name_, location, date_, theme, description_ } = req.body
        try {
            const evnt = await Events_.create(con);
            const newEvnt = await evnt.create({ name_, location, date_, theme, description_ })
            console.log(newEvnt)
            res.json(true)
        } catch (error) {
            console.log(error)
            res.send(false)
        } finally {
            await conexion.cerrar(con);
        }
    }
}

module.exports = event_