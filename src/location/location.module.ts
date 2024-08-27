import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [LocationController],
  providers: [LocationService, JwtStrategy]
})
export class LocationModule {}
