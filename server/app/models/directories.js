export default (sequelize, DataTypes) => {
	const fields = {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'title'
		}
	};

	const definition = {
		tableName: 'directories',
		timestamps: true
	};

	const directories = sequelize.define('directories', fields, definition);
	directories.associate = (db) => {
		directories.hasMany(db.tasks, {
			foreignKey: {
				name: 'directories_id',
				field: 'directories_id',
				allowNull: false
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
	};
	return directories;
};