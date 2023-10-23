import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from './seeds/init.seeder';

config();

export const dataSourceOptions: DataSourceOptions & SeederOptions =
  process.env.DIST === 'true'
    ? {
        type: 'postgres',
        host: process.env.DATABASE_PG_HOST,
        port: +process.env.DATABASE_PG_PORT,
        username: process.env.DATABASE_PG_USERNAME,
        password: process.env.DATABASE_PG_PASSWORD,
        database: process.env.DATABASE_PG_NAME,
        entities: ['dist/resource/**/*.entity{.ts,.js}'],
        migrations: ['dist/db/migrations/*{.ts,.js}'],
        seeds: [InitSeeder],
      }
    : {
        type: 'postgres',
        host: process.env.DATABASE_PG_HOST,
        port: +process.env.DATABASE_PG_PORT,
        username: process.env.DATABASE_PG_USERNAME,
        password: process.env.DATABASE_PG_PASSWORD,
        database: process.env.DATABASE_PG_NAME,
        entities: ['src/resource/**/*.entity{.ts,.js}'],
        migrations: ['dist/db/migrations/*{.ts,.js}'],
        seeds: [InitSeeder],
      };

export default new DataSource(dataSourceOptions);
