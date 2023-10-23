import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_PG_HOST,
  port: +process.env.DATABASE_PG_PORT,
  username: process.env.DATABASE_PG_USERNAME,
  password: process.env.DATABASE_PG_PASSWORD,
  database: process.env.DATABASE_PG_NAME,
  entities: ['dist/resource/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/**/*.js'],
};

export default new DataSource(dataSourceOptions);
