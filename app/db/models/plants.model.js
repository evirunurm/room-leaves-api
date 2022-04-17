module.exports = (sequelize, Sequelize) => {

    // Table creation for Plants
    // sequelize.define returns the Model, that's why we're collecting the return into Plants constant, and returning it to be assigned to the bd object.
    const Plants = sequelize.define("plant", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            stock: {
                type: Sequelize.INTEGER,
                defaultValue: 20,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
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
                type: Sequelize.INTEGER,
                validate: {
                    max: 100,
                    min: 0
                }
            },
            temperature: {
                type: Sequelize.INTEGER
            },
            height: {
                type: Sequelize.DOUBLE(6, 2),
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