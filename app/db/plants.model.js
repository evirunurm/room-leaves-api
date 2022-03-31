module.exports = (sequelize, Sequelize) => {

    // Table creation for Plants
    // sequelize.define returns the Model, that's why we're collecting the return into Plants constant, and returning it to be assigned to the bd object.
    const Plants = sequalize.define("Plant",
        {

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