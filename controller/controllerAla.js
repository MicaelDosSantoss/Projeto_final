
const { Ala } = require("../models")
const { oculos_alas } = require("../models")
const { v4: uuid } = require("uuid");


const controllerAla = {
    getAla: async (req, res) => {
        const alas = await Ala.findAll();
        const deleted = req.query.deleted; // Captura o parâmetro 'deleted'

        res.status(200).render("alas/ala", { alas,deleted } )
    },

    getAla_create: async (req,res) => {
        res.render("alas/ala_create")
    },

    getAla_update: async (req,res) => {
        const { Id_Ala } = req.params;
        const ala = await Ala.findByPk(Id_Ala)
        res.render("alas/ala_update", { ala })
    },

    postAla: async (req,res) => {
        const { Prateleira, Secao } = req.body;

        if(Prateleira, Secao) {

            const ala = await Ala.create({
                Id_Ala: uuid(),
                Prateleira: Prateleira,
                Secao: Secao
            })
    
            return res.status(200).json({
                Message: "Ala cadastrada com sucesso!",
                Ala: ala
            })
        } else {
            return res.json({
                Message: "Erro no envio!"
            })
        }

    },

    putAla: async (req,res) => {
        const { Id_Ala } = req.params;
        const { Prateleira, Secao } = req.body;

        try {     
            const ala = await Ala.findOne({ where: { Id_Ala } });
    
            if (!ala) {
                return res.status(404).json({
                    Message: "Ala não encontrada!",
                });
            }
    
            await Ala.update({Prateleira, Secao}, { where: { Id_Ala } });
    
            return res.status(200).json({
                Message: "Atualizado com sucesso!",
            });
    
        } catch (error) {
            console.error("Erro ao atualizar a Ala:", error);
            return res.status(500).json({
                Message: "Erro interno no servidor.",
            });
        }

    },

    deleteAla: async (req,res) => {
        const { Id_Ala } = req.params;

        const deleted = await Ala.destroy({ where: { Id_Ala } })

        const Alas_alasRecord = await oculos_alas.findOne({ where: { Id_Ala_fk: Id_Ala } });

            if (Alas_alasRecord) {
                await oculos_alas.destroy({ where: { Id_oculos_fk: Id_oculos } });
            }

        if(deleted == 1) {
            return res.status(200).json({
                deleted: true,
                Message: "Ala deletada com sucesso!"
            })
        } else {
            return res.status(404).json({
                Message: "Não foi possível excluir a ala!"
            }) 
        }
    }
}

module.exports = controllerAla