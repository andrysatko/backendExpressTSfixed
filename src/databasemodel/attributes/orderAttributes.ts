import { DataTypes } from "sequelize"

const orderAttributes = {
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}


export default orderAttributes;