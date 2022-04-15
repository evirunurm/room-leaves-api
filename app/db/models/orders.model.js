module.exports = (sequelize, Sequelize) => {

    const Orders = sequelize.define("Order", {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        total: {
            type: Sequelize.DOUBLE(6, 2),
            allowNull: false
        },
        discount: {
            type: Sequelize.DOUBLE(6, 2),
        },

    },{
        timestamps: true,
        underscored: true,
        tableName: "orders",
        comment: "Orders made by users. They consist of plants."
    })

    return Orders;
}