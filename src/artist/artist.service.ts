import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artists } from 'src/database/database';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist = { id: uuid(), ...createArtistDto };
    artists.push(artist);
    return artist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    const artist = artists.find((artist) => artist.id == id);
    if (!artist)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artists.find((artist) => artist.id == id);
    if (!artist)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  remove(id: string) {
    const indexArtist = artists.findIndex((artist) => artist.id == id);
    if (indexArtist == -1)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    artists.splice(indexArtist, 1);
  }
}
