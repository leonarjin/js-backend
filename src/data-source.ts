import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Tasks } from "./entity/Tasks"


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
