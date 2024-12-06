
const { v4:uuidv4 } = require('uuid');

module.exports = (sequelize,DataTypes) => {
  const Oculos = sequelize.define("Oculos", {
    Id_oculos: {
      type:DataTypes.UUIDV4,
      defaultValue: uuidv4,
      primaryKey: true,
    },

    Material: {
      type:DataTypes.STRING,
      allowNull: false
    },

    Tamanho: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    Marca: {
      type: DataTypes.STRING,
      allowNull:false
    },

    Genero: {
      type: DataTypes.ENUM("Masculino","Feminino","Unissex"),
      allowNull:false
    },

    Forma: {
      type: DataTypes.STRING,
      allowNull:false
    },

    Valor: {
      type: DataTypes.STRING,
      allowNull:false
    }

  },{
    tablename: 'oculos',
    timestamps: true
  });
    return Oculos
}