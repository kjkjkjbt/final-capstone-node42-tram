import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [BookingController],
  providers: [BookingService, JwtStrategy]
})
export class BookingModule {}
