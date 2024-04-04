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
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'description'
		},
		date: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date'
		},
		archived: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'archived'
		},
		important: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'important'
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'completed'
		}
	};

	const definition = {
		tableName: 'tasks',
		timestamps: true
	};

	const tasks = sequelize.define('tasks', fields, definition);
	tasks.associate = (db) => {
		tasks.belongsTo(db.users, {
			foreignKey: {
				name: 'userId',
				field: 'user_id',
				allowNull: false
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
		tasks.belongsTo(db.directories, {
			foreignKey: {
				name: 'directories_id',
				field: 'directories_id',
				allowNull: false
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
	};
	return tasks;
};