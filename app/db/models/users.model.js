const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, Sequelize) => {

    const Clients = sequelize.define("client",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.TEXT
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            salt: {
                type: Sequelize.STRING(200)
                // Commenting this in case it gives an error when salt if not passed from the beginning.
                // allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true,
            tableName: "users",
            comment: "Room Leaves' registered users",
            hooks: {
                beforeCreate: async (user) => {
                    user.salt = await bcrypt.genSalt(saltRounds);
                    user.password = await bcrypt.hash(user.password, user.salt);
                }
            }
        }
    );

    Clients.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    }

    return Clients;
}