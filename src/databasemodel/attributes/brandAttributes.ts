import { DataTypes } from "sequelize"

const brandAttributes = {
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}


export default brandAttributes;