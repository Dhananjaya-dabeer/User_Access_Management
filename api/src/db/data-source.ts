import { Software } from "../entities/Software";
import { Request } from "../entities/Request";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Software, Request],
});
