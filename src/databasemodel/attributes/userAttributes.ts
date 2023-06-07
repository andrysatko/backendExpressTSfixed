import { DataTypes } from "sequelize"

const userAttributes = {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type:DataTypes.STRING ,
        allowNull: false,
    },
    imgLink : {
        type:DataTypes.STRING,
        allowNull: true,
    },
}


export default userAttributes;