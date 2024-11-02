import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule],
})
export class AppModule {}
