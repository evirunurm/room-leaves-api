module.exports = (sequelize, Sequelize) => {

    const Orders = sequelize.define("order", {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        discount: {
            type: Sequelize.DOUBLE(6, 2),
        },
        state: {
            type: Sequelize.ENUM("Completed", "Pending", "Processing")
        }

    },{
        timestamps: true,
        underscored: true,
        tableName: "orders",
        comment: "Orders made by users. They consist of plants."
    })

    return Orders;
}