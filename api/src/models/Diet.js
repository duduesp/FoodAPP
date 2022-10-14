const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define("diet", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
        //es para que no aparezca la info de la hora y fecha de creacion
    })
}