import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.createArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeArtist(id);
  }
}
