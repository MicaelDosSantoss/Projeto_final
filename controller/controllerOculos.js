
const { Oculos } = require("../models")
const { v4: uuid } = require("uuid");
const { oculos_alas } = require("../models")

const controllerOculos = {

    getOculos: async (req, res) => {
        const oculos = await Oculos.findAll();
        const deleted = req.query.deleted; // Captura o parâmetro 'deleted'

        if(deleted) {
            console.log("oculos deletado!")
        }

        return res.render("oculos/oculos", { oculos,deleted })
    },

    getAddItem: (req,res) => {
        return res.render("oculos/add-item")
    },

    getUpdatedItem: async (req,res) => {

        const { Id_oculos } = req.params;
        const oculo = await Oculos.findByPk(Id_oculos)

        return res.render("oculos/update-item", { oculo })
    },

    postOculos: async (req, res) => {
        const { Material, Tamanho, Marca, Genero, Forma, Valor } = req.body

        if (Material, Tamanho, Marca, Genero, Forma, Valor) {
            try {
                const nv_oculos = await Oculos.create({
                    Id_oculos: uuid(),
                    Material: Material,
                    Tamanho: Tamanho,
                    Marca: Marca,
                    Genero: Genero,
                    Forma: Forma,
                    Valor: Valor
                })

                return res.status(200).json({
                    Message: "Oculos cadastrado com sucesso!",
                    oculos: nv_oculos
                })

            } catch (error) {
                return res.status(500).json({
                    Message: "Erro no envio!",
                })
            }
        } else {
            return res.status(404).json({
                Message: "Body vazio!"
            })
        }
    },

    putOculos: async (req, res) => {
        const { Id_oculos } = req.params;
        const { Material, Tamanho, Marca, Genero, Forma, Valor } = req.body

        const update = await Oculos.update({ Material, Tamanho, Marca, Genero, Forma, Valor }, {
            where: { Id_oculos }
        })

        if (update != 0) {
            return res.status(200).json({
                Message: "Atualização feita com sucesso!",
                update: update,
                Oculos: await Oculos.findByPk(Id_oculos)
            })
        } else {
            return res.status(500).json({
                Message: "Oculos não encontrado!"
            })
        }
    },

    deleteOculos: async (req, res) => {
        const { Id_oculos } = req.params;

        try {
            const oculos_alasRecord = await oculos_alas.findOne({ where: { Id_oculos_fk: Id_oculos } });

            if (oculos_alasRecord) {
                await oculos_alas.destroy({ where: { Id_oculos_fk: Id_oculos } });
            }

            const destroy = await Oculos.destroy({ where: { Id_oculos } })

            if (destroy != 0) {
                return res.status(200).json({
                    deleted: true,
                    message: "Óculos excluído com sucesso!"
                });
            } else {
                return res.status(500).json({
                    Message: "Oculos não encontrado!"
                })
            }
        } catch (error) {
            console.log(error.message)
        }
        
    }
}


module.exports = controllerOculos;