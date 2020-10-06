import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WeatherModule } from './future/weather.module';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

const swgUrl = "mongodb://root:q1w2e3r4@127.0.0.1:27017/yi?authSource=admin";
const syUrl = "mongodb+srv://ysha:Woaizhongguo%402020@cluster1.ieadu.mongodb.net/test?retryWrites=true&w=majority";
@Module({
  imports: [
    MongooseModule.forRoot(swgUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    WeatherModule,
    UsersModule,
    CommunitiesModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
