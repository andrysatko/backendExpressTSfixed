import {DataTypes, Sequelize} from 'sequelize';
import {ConfigDB} from './DatabaseConfig'
import userAttributes from './attributes/userAttributes'
import commentSchema from "./attributes/commentAttributes";
import productAttributes from "./attributes/productAttributes";
import orderAttributes from "./attributes/orderAttributes";
import typeAttributes from "./attributes/typeAttributes";
import brandAttributes from "./attributes/brandAttributes";

export const sequelize = new Sequelize(ConfigDB.Database,ConfigDB.User ,ConfigDB.Password , {
    host: ConfigDB.Host,
    dialect: 'postgres',
    port: ConfigDB.Port,
});
    const User = sequelize.define('User' , userAttributes);
    const Comment = sequelize.define('Comment' , commentSchema);
    const Product = sequelize.define('Product', productAttributes);
    const Order = sequelize.define('Order' , orderAttributes);
    const Type = sequelize.define('Type' , typeAttributes);
    const Brand = sequelize.define('Brand' , brandAttributes);
    const OrderProduct = sequelize.define('OrderProduct', {
        Order: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
        Product: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: 'id'
            }
        }
    })

    User.hasMany(Comment)
    User.hasMany(Order)
    Type.hasMany(Product)
    Brand.hasMany(Product)
    Order.belongsTo(User)
    Comment.belongsTo(User)
    Product.belongsTo(Type)
    Product.belongsTo(Brand)
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

// sequelize.sync({force: true})
export {User, Comment , Product ,Order ,Type , Brand , OrderProduct}
