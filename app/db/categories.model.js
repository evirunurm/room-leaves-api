module.exports = (sequelize, Sequelize) => {

    // Table creation for Plants
    // sequelize.define returns the Model, that's why we're collecting the return into Plants constant, and returning it to be assigned to the bd object.
    const Categories = sequelize.define("Category",
        {
            id : {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name : {
                type: Sequelize.STRING,
                allowNull: false
            },
            description : {
                description: Sequelize.STRING
            }
        },
        {
            timestamps: true,
            underscored: true,
            tableName: "categories",
            comment: "Categories of plants"
        }
    );



    return Categories;
}