module.exports = (sequelize, Sequelize) => {

	const Scores = sequelize.define("score", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		value: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				max: 5,
				min: 1
			}
		},
		message: {
			type: Sequelize.STRING,
		},

	},{
		timestamps: true,
		underscored: true,
		tableName: "scores",
		comment: "Scores given by users to plants."
	});

	return Scores;
}