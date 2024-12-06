const express = require("express")
const router = express.Router();
const controllerAla = require("../controller/controllerAla")

router.get("/ala",controllerAla.getAla)
router.get("/ala/create",controllerAla.getAla_create)
router.get("/ala/update/:Id_Ala",controllerAla.getAla_update)
router.post("/ala",controllerAla.postAla)
router.put("/ala/update/:Id_Ala",controllerAla.putAla)
router.delete("/ala/delete/:Id_Ala",controllerAla.deleteAla)




module.exports = router