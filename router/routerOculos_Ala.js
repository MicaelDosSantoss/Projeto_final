const express = require("express");
const router = express.Router();
const controllerOculos_Alas = require("../controller/controllerAlas_oculos")

router.get("/estoque",controllerOculos_Alas.getOculos_Alas)
router.post("/estoque/create",controllerOculos_Alas.postOculos_Alas)
router.get("/estoque/created",controllerOculos_Alas.Oculos_alas_localizacao_create)
router.get("/estoque/update/:Id_Ala_Oculos",controllerOculos_Alas.getAla_update)
router.put("/estoque/update/:Id_Ala_Oculos", controllerOculos_Alas.updateOculos_Alas)
router.delete("/estoque/delete/:Id_Ala_Oculos",controllerOculos_Alas.deleteOculos_Alas)

module.exports = router