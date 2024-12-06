const { v4:uuidv4 } = require('uuid');

module.exports = (sequelize,DataTypes) => {
  const Ala = sequelize.define("Ala", {
    Id_Ala: {
      type:DataTypes.UUIDV4,
      defaultValue: uuidv4,
      primaryKey: true,
    },

    Prateleira: {
      type: DataTypes.STRING,
      allowNull:false
    },

    Secao: {
      type: DataTypes.STRING,
      allowNull:false
    }

  },{
    tablename: 'Alas',
    timestamps: true
  });
    return Ala
}