const router = require("express").Router();
const ticket = require("../controllers/tickets.controllers");
const user = require("../controllers/users.controllers");
const volunteer = require('../controllers/volunteers.controllers')
const events = require("../controllers/events.controllers")

//USER

router.post("/user-register", user.register)
router.post("/setAvatar", user.setAvatar)
router.post("/user-update", user.update)
router.get("/increaseStrike/:id", user.increaseStrikes)
router.get("/resetStrikes", user.resetStrikes)
router.get("/getUser/:id", user.getUserData)
router.get("/getAssigned/:id", user.getAssigned)

//VOLUNTEER / TECNIC

router.post("/login", volunteer.login )
router.get("/volunteer/:id", volunteer.getvolunteerData)
router.post("/volunteer-register", volunteer.register)
router.get("/getLogged", volunteer.getLogged)

//TICKETS

router.post("/newTicket", ticket.insert)

//EVENTS

router.post("/newEvent", events.create)


module.exports = router;