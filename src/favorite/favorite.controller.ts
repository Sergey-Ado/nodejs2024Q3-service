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
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @Post('track/:id')
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeTrack(id);
  }

  @Post('album/:id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeAlbum(id);
  }

  @Post('artist/:id')
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeArtist(id);
  }
}
