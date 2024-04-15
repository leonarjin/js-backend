import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Tasks } from "./entity/Tasks"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "isabelle.db.elephantsql.com",
    port: 5432,
    username: "tdkdozcs",
    password: "cSVPoSyaLtXWqY-kmLTG_oVOsLU3Vucf",
    database: "tdkdozcs",
    synchronize: true,
    logging: false,
    entities: [User, Tasks],
    migrations: [],
    subscribers: [],
})
