module.exports = (sequelize, Sequelize) => {

    const OrdersDetails = sequelize.define("orderDetail", {

        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE(6, 2),
            allowNull: false
        },

    },{
        timestamps: true,
        underscored: true,
        tableName: "order_details",
        comment: "Each product from an order. One row per product per order."
    })

    return OrdersDetails;
}