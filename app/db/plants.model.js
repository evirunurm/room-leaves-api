module.exports = (sequelize, Sequelize) => {

    // Table creation for Plants
    // sequelize.define returns the Model, that's why we're collecting the return into Plants constant, and returning it to be assigned to the bd object.
    const Plants = sequalize.define("Plant",
        {
            id: {
                type: Sequelize.INT,
                autoIncrement: true,
                primaryKey: true
            },
            stock: {
                type: Sequelize.INT,
                defaultValue: 20,
                allowNull: false
            },
            score: {
                type: Sequelize.INT,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 5
                }
            },
            description: {
                type: Sequelize.TEXT,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            price: {
                type: Sequelize.DOUBLE(6, 2),
                allowNull: false
            },
            humidity: {
                type: Sequelize.INT,
                validate: {
                    max: 100,
                    min: 0
                }
            },
            temperature: {
                type: Sequelize.INT
            },
            height: {
                type: Sequelize.INT,
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true,
            tableName: "plants",
            comment: "Plants stored for selling."
        }
    );


    return Plants;
}