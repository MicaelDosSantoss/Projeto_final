const express = require("express");
const router = express.Router();
const controllerOculos = require("../controller/controllerOculos")

router.get("/oculos",controllerOculos.getOculos)
router.get("/oculos/addItem",controllerOculos.getAddItem)
router.get("/oculos/update-view/:Id_oculos",controllerOculos.getUpdatedItem)
router.post("/oculos",controllerOculos.postOculos)
router.put("/oculos/update/:Id_oculos",controllerOculos.putOculos)
router.delete("/oculos/delete/:Id_oculos",controllerOculos.deleteOculos)

module.exports = router