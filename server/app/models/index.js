import * as url from 'url';
import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
import settings from '#app/settings.js';

const { join } = path;
const { dbSettings, env: nodeEnv } = settings;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const basename = path.basename(__filename);

const db = {};

const options = {
    host: dbSettings.host,
    dialect: dbSettings.dialect,
    dialectOptions: {
        decimalNumbers: true
    }
}
if (nodeEnv === 'production') {
    options.logging = false;
}
const sequelize = new Sequelize(
    dbSettings.database,
    dbSettings.username,
    dbSettings.password,
    options
);

/**
 * Find all model files
 */
const files = fs.readdirSync(__dirname);
for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js') {
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const module = await import(join(__dirname, file));
        const model = module.default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    }
}

/**
 * Create a db instance of all models
 */
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;