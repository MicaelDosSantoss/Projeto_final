const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {

  // Definindo os modelos sem as associações ainda
  const Ala = require("./ala")(sequelize, DataTypes);
  const Oculos = require("./oculos")(sequelize, DataTypes);

  // Definindo o modelo intermediário sem associar ainda
  const OculosAlas = sequelize.define('oculos_alas', {
    Id_Ala_Oculos: {
      type: DataTypes.UUIDV4,
      defaultValue: uuidv4,
      primaryKey: true,
    },

    Id_Ala_fk: {
      type: DataTypes.STRING,
      references: {
        model: Ala,
        key: 'Id_Ala',
      },
    },

    Id_oculos_fk: {
      type: DataTypes.UUIDV4,
      references: {
        model: Oculos,
        key: 'Id_oculos',
      },
    },

    status: {
      type: DataTypes.ENUM("DISPONÍVEL", "iNDISPONÍVEL"),
      defaultValue: 'DISPONÍVEL'
    }
  }, {
    tableName: 'oculos_alas',
    timestamps: true
  });


  Ala.belongsToMany(Oculos, {
    through: OculosAlas,
    foreignKey: 'Id_Ala_fk',
    otherKey: 'Id_oculos_fk',
  });

  Oculos.belongsToMany(Ala, {
    through: OculosAlas,
    foreignKey: 'Id_oculos_fk',
    otherKey: 'Id_Ala_fk',
  });


  return OculosAlas;
};
