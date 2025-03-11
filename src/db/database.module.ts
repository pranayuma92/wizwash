import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { UserModel } from './models/user.model';
import { TenantModel } from './models/tenant.model';
import { UserTenantModel } from './models/user-tenant.model';
import { ConfigModel } from './models/config.model';
import { MemberModel } from './models/member.model';
import { OrderDetailModel } from './models/order-detail.model';
import { OrderModel } from './models/order.model';
import { ProductModel } from './models/product.model';

const models = [
  UserModel,
  TenantModel,
  UserTenantModel,
  ConfigModel,
  MemberModel,
  OrderDetailModel,
  OrderModel,
  ProductModel
];

const modelProviders = models.map((model) => {
	return {
		provide: model.name,
		useValue: model
	};
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        // client: 'mysql',
        // connection: {
        //   host: process.env.DB_HOST,
        //   port: Number(process.env.DB_PORT),
        //   user: process.env.DB_USERNAME,
        //   password: process.env.DB_PASSWORD,
        //   database: process.env.DB_NAME,
        // },
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}