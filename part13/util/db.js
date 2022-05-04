// const Sequelize = require('sequelize')
// const { DATABASE_URL } = require('./config')

// const sequelize = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
// });

// const connectToDatabase = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('connected to the database')
//   } catch (error) {
//     console.log('failed to connect to the database')
//     return process.exit(1)
//   }

//   return null
// }

// module.exports = { connectToDatabase, sequelize }

const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations(); // highlight-line
    console.log("Connected to Database");
  } catch (error) {
    console.log("Fail to connecto to Database", error);
    return process.exit(1);
  }
  return null;
};

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };

// const Sequelize = require('sequelize')
// const Umzug = require('umzug')
// const { DATABASE_URL } = require('./config')

// const sequelize = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
// })

// const runMigrations = async () => {
//   const migrator = new Umzug({
//     storage: 'sequelize',
//     storageOptions: {
//       sequelize,
//       tableName: 'migrations',
//     },
//     migrations: {
//       params: [sequelize.getQueryInterface()],
//       path: `${process.cwd()}/migrations`,
//       pattern: /\.js$/,
//     },
//   })
//   const migrations = await migrator.up()
//   console.log('Migrations up to date', {
//     files: migrations.map((mig) => mig.file),
//   })
// }

// const connectToDatabase = async () => {
//   try {
//     await sequelize.authenticate()
//     await runMigrations()
//     console.log('database connected')
//   } catch (err) {
//     console.log('connecting database failed')
//     return process.exit(1)
//   }

//   return null
// }

// module.exports = { connectToDatabase, sequelize }
