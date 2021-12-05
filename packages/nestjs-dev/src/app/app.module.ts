import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevService } from './services/dev';

@Module({
  imports: [DevService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
