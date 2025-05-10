import { HttpException, Injectable } from '@nestjs/common';
import { albums, artists, favorites, tracks } from 'src/database/database';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavoriteService {
  findAll() {
    return {
      artists: artists.filter((artist) =>
        favorites.artists.includes(artist.id),
      ),
      albums: albums.filter((album) => favorites.albums.includes(album.id)),
      tracks: tracks.filter((track) => favorites.tracks.includes(track.id)),
    };
  }

  createTrack(id: string) {
    const track = tracks.find((track) => track.id == id);
    if (!track)
      throw new HttpException(
        "track doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!favorites.tracks.includes(id)) favorites.tracks.push(id);
  }

  removeTrack(id: string) {
    const indexTrack = favorites.tracks.indexOf(id);
    if (indexTrack == -1)
      throw new HttpException(
        `track doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    favorites.tracks.splice(indexTrack, 1);
    return `track id=${id} deleted from favorites`;
  }

  createAlbum(id: string) {
    const album = albums.find((album) => album.id == id);
    if (!album)
      throw new HttpException(
        "album doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!favorites.albums.includes(id)) favorites.albums.push(id);
  }

  removeAlbum(id: string) {
    const indexAlbum = favorites.albums.indexOf(id);
    if (indexAlbum == -1)
      throw new HttpException(
        `album doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    favorites.albums.splice(indexAlbum, 1);
    return `album id=${id} deleted from favorites`;
  }

  createArtist(id: string) {
    const artist = artists.find((artist) => artist.id == id);
    if (!artist)
      throw new HttpException(
        "artist doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!favorites.artists.includes(id)) favorites.artists.push(id);
  }

  removeArtist(id: string) {
    const indexArtist = favorites.artists.indexOf(id);
    if (indexArtist == -1)
      throw new HttpException(
        `artist doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    favorites.artists.splice(indexArtist, 1);
    return `artist id=${id} deleted from favorites`;
  }
}
