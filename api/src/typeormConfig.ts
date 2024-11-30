import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    host: process.env.PGHOST,
    database: process.env.POSTGRES_DB,
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