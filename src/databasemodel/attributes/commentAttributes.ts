import {DataTypes} from "sequelize"
import {constants} from "fs";


const CommentAttributes = {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

export default  CommentAttributes