import { HttpException, Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favorites = await this.getFavorites();
    const artists = await this.prisma.artist.findMany({
      where: {
        id: { in: favorites.artists },
      },
    });
    const albums = await this.prisma.album.findMany({
      where: {
        id: { in: favorites.albums },
      },
    });
    const tracks = await this.prisma.track.findMany({
      where: {
        id: { in: favorites.tracks },
      },
    });
    return { artists, albums, tracks };
  }

  async createTrack(id: string) {
    const favorites = await this.getFavorites();
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track)
      throw new HttpException(
        "track doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!favorites.tracks.includes(id)) {
      favorites.tracks.push(id);
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { tracks: favorites.tracks },
      });
    }
  }

  async removeTrack(id: string) {
    const favorites = await this.getFavorites();
    const indexTrack = favorites.tracks.indexOf(id);
    if (indexTrack == -1)
      throw new HttpException(
        `track doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    favorites.tracks.splice(indexTrack, 1);
    await this.prisma.favorites.update({
      where: { id: 1 },
      data: { tracks: favorites.tracks },
    });
  }

  async createAlbum(id: string) {
    const favorites = await this.getFavorites();
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album)
      throw new HttpException(
        "album doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!favorites.albums.includes(id)) {
      favorites.albums.push(id);
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { albums: favorites.albums },
      });
    }
  }

  async removeAlbum(id: string) {
    const favorites = await this.getFavorites();
    const indexAlbum = favorites.albums.indexOf(id);
    if (indexAlbum == -1)
      throw new HttpException(
        `album doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    favorites.albums.splice(indexAlbum, 1);
    await this.prisma.favorites.update({
      where: { id: 1 },
      data: { albums: favorites.albums },
    });
  }

  async createArtist(id: string) {
    const favorites = await this.getFavorites();
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist)
      throw new HttpException(
        "artist doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    if (!favorites.artists.includes(id)) {
      favorites.artists.push(id);
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { artists: favorites.artists },
      });
    }
  }

  async removeArtist(id: string) {
    const favorites = await this.getFavorites();
    const indexArtist = favorites.artists.indexOf(id);
    if (indexArtist == -1)
      throw new HttpException(
        `artist doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );
    favorites.artists.splice(indexArtist, 1);
    await this.prisma.favorites.update({
      where: { id: 1 },
      data: { artists: favorites.artists },
    });
  }

  async getFavorites() {
    let favorites = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });
    if (!favorites)
      favorites = await this.prisma.favorites.create({
        data: { artists: [], albums: [], tracks: [] },
      });
    return favorites;
  }
}
