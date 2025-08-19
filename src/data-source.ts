import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [
    process.env.NODE_ENV === 'production'
      ? '/app/dist/**/*.entity{.ts,.js}'
      : __dirname + '/**/*.entity{.ts,.js}',
  ],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
