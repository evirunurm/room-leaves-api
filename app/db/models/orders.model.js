module.exports = (sequelize, Sequelize) => {

    const Orders = sequelize.define("order", {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        total: {
            type: Sequelize.DOUBLE(6,2),
            allowNull: false
        },
        state: {
            type: Sequelize.ENUM("Completed", "Pending", "Processing"),
            defaultValue: "Processing"
        },
        shippingMethod: {
            type: Sequelize.ENUM("CE", "UPSE"),
            allowNull: false
        },
        billingAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentMethod: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                max: 2,
                min: 1
            }
        },

    },{
        timestamps: true,
        underscored: true,
        tableName: "orders",
        comment: "Orders made by users. They consist of plants."
    })

    return Orders;
}