module.exports = (sequelize, Sequelize) => {

    // sequelize.define returns the Model, that's why we're collecting the return into Plants constant, and returning it to be assigned to the bd object.
    const Favorites = sequelize.define("favorite",
        {
            id : {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            underscored: true,
            tableName: "favorites",
            comment: "Association of plants and users"
        }
    );

    return Favorites;
}