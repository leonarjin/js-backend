import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Tasks } from "./entity/Tasks";
import "dotenv/config";

const getDBConfig = (json: any) => {
    const newObj = {};

    for (const prop in json) {
        if (!prop.startsWith("DB_")) {
            continue;
        }
        const newProp = prop.substring(prop.indexOf("_") + 1).toLowerCase();
        newObj[newProp] = json[prop];
    }

    return newObj;
};

const config = getDBConfig(process.env) as DataSourceOptions;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "salt.db.elephantsql.com",
    port: 5432,
    username: "sysjuccs",
    password: "6qJklLIwqEGoH1Tlc0XKuRSLcqA-A8YM",
    database: "sysjuccs",
    synchronize: true,
    logging: false,
    entities: [User, Tasks],
    migrations: [],
    subscribers: [],
})

