import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"],

    // type: 'postgres',
    // username: 'postgres',
    // password: 'root',
    // port: 5432,
    // host: 'localhost',
    // database: 'blogapp',
    // synchronize: true,
    // entities: ["dist/**/*.entity{.ts,.js}"],
};