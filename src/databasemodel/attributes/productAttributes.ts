import { DataTypes } from "sequelize"

const productAttributes = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    currency : {
        type:DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type:DataTypes.STRING ,
        allowNull: true,
    },
}


export default productAttributes;