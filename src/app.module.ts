import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, ArtistModule],
})
export class AppModule {}
