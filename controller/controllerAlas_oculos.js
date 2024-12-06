
const { where } = require("sequelize")
const { oculos_alas } = require("../models")
const { Ala } = require("../models")
const { Oculos } = require("../models")
const { v4: uuid } = require("uuid")

const Oculos_Alas = {

    getOculos_Alas: async (req, res) => {
        const getAll = await oculos_alas.findAll();
        const deleted = req.query.deleted; // Captura o parâmetro 'deleted'

        res.render("estoque/estoque", { getAll, deleted })
    },

    Oculos_alas_localizacao_create: async (req, res) => {
        getOculos = await Oculos.findAll();
        getAlas = await Ala.findAll();
        res.render("estoque/estoque_create", { getOculos, getAlas})
    },

    getAla_update: async (req,res) => {
        const { Id_Ala_Oculos } = req.params;
        const getOculos = await Oculos.findAll();
        const getAlas = await Ala.findAll();
        const itemAtual = await oculos_alas.findOne({ where: {Id_Ala_Oculos} })
        console.log(itemAtual)
        res.render("estoque/estoque_update", { itemAtual, getOculos, getAlas } )
    },

    postOculos_Alas: async (req, res) => {
        const { Id_Ala, Id_oculos, status } = req.body;


        if (!Id_Ala || !Id_oculos || !status) {
            return res.status(400).json({
                Message: "Dados incompletos",
                Error: "Id_Ala, Id_oculos, e status são obrigatórios."
            });
        }

        const ala = await Ala.findOne({ where: { Id_Ala } })
        const oculos = await Oculos.findOne({ where: { Id_oculos } })

        if (ala && oculos) {
            const create = await oculos_alas.create({
                Id_Ala_Oculos: uuid(),
                Id_Ala_fk: Id_Ala,
                Id_oculos_fk: Id_oculos,
                status: status
            })

            return res.status(200).json({
                Message: "criado com sucesso!",
                created: create
            })
        } else {

            const exist_ala = ala == null ? "Ala não existe!" : "Ala existe!"
            const exist_oculos = oculos == null ? "Oculos não existe!" : "Oculos existe!"
            return res.status(404).json({
                Message: "Erro não criação",
                ala: exist_ala,
                oculos: exist_oculos
            })
        }
    },

    updateOculos_Alas: async (req, res) => {
        const { Id_Ala_Oculos } = req.params;
        const { Status } = req.body;

        try {
            const oculosAlas = await oculos_alas.findOne({ where: { Id_Ala_Oculos } });

            if (!oculosAlas) {
                return res.status(404).json({
                    Message: "estoque não encontrado!",
                });
            }

            await Ala.update({ Status }, { where: { Id_Ala_Oculos } });

            return res.status(200).json({
                Message: "Atualizado com sucesso!",
            });

        } catch (error) {
            console.error("Erro ao atualizar o estoque:", error);
            return res.status(500).json({
                Message: "Erro interno no servidor.",
            });
        }

    },

    deleteOculos_Alas: async (req, res) => {
        const { Id_Ala_Oculos } = req.params;

        const Destroy = await oculos_alas.destroy({ where: { Id_Ala_Oculos } })

        if (Destroy) {
            return res.status(200).json({
                deleted: true,
                Message: "Item deletado com sucesso!"
            })
        } else {
            return res.status(404).json({
                Message: "Item não encontrado!"
            })
        }
    }
}

module.exports = Oculos_Alas