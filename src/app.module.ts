import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypegooseModule } from "nestjs-typegoose";

import { UserModule } from "./user/user.module";
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ProductsService } from './products/products.service';
// import { ProductsController } from './products/products.controller';
// import { AuthModule } from './auth/auth.module';
import { WeatherController } from './weather/weather.controller';
import { WeatherModule } from './weather/weather.module';
import { UsersModule } from './users/users.module';

// mongodb://YourUsername:YourPasswordHere@127.0.0.1:27017/your-database
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:q1w2e3r4@127.0.0.1:27017/yi?authSource=admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    WeatherModule,
    UsersModule],
  // controllers: [AppController, ProductsController],
  // providers: [AppService, ProductsService],
})
export class AppModule {}
