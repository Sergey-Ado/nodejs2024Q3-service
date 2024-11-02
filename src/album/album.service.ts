import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, albums, favorites, tracks } from 'src/database/database';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuid(),
      ...createAlbumDto,
    };
    albums.push(album);
    console.log(album.artistId);
    return album;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const album = albums.find((album) => album.id == id);
    if (!album)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albums.find((album) => album.id == id);
    if (!album)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  remove(id: string) {
    const indexAlbum = albums.findIndex((album) => album.id == id);
    if (indexAlbum == -1)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    albums.splice(indexAlbum, 1);

    tracks
      .filter((track) => track.albumId == id)
      .forEach((track) => (track.albumId = null));

    favorites.albums = favorites.albums.filter((albumId) => albumId != id);

    return `Album id=${id} deleted`;
  }
}
