import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { cwd } from 'process';
import { join } from 'path';
import { LocationModule } from './location/location.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/img'),
      serveRoot: "/public/img"
    }),
    AuthModule,
    UserModule,
    LocationModule,
    RoomModule,
    BookingModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
