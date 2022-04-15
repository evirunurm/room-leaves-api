module.exports = (sequelize, Sequelize) => {

    const OrdersDetails = sequelize.define("OrderDetail", {

        amount: {
            type: Sequelize.INTEGER,
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