import { HttpException, Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artists = await this.prisma.artist.findMany({
      where: {
        FavArtists: {
          some: {
            userId: 1,
          },
        },
      },
    });
    const albums = await this.prisma.album.findMany({
      where: {
        FavAlbums: {
          some: {
            userId: 1,
          },
        },
      },
    });
    const tracks = await this.prisma.track.findMany({
      where: {
        FavTracks: {
          some: {
            userId: 1,
          },
        },
      },
    });

    return { artists, albums, tracks };
  }

  async createArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist)
      throw new HttpException(
        "artist doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );

    await this.prisma.favArtists.create({
      data: { artistId: id },
    });
  }

  async removeArtist(id: string) {
    const artist = await this.prisma.favArtists.findUnique({
      where: { artistId: id },
    });
    if (!artist)
      throw new HttpException(
        `artist doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );

    await this.prisma.favArtists.delete({
      where: { artistId: id },
    });
  }

  async createAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album)
      throw new HttpException(
        "album doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );

    await this.prisma.favAlbums.create({
      data: { albumId: id },
    });
  }

  async removeAlbum(id: string) {
    const album = await this.prisma.favAlbums.findUnique({
      where: { albumId: id },
    });
    if (!album)
      throw new HttpException(
        `album doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );

    await this.prisma.favAlbums.delete({
      where: { albumId: id },
    });
  }

  async createTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track)
      throw new HttpException(
        "track doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );

    await this.prisma.favTracks.create({
      data: { trackId: id },
    });
  }

  async removeTrack(id: string) {
    const track = await this.prisma.favTracks.findUnique({
      where: { trackId: id },
    });
    if (!track)
      throw new HttpException(
        `track doesn't exists in favorites`,
        StatusCodes.NOT_FOUND,
      );

    await this.prisma.favTracks.delete({
      where: { trackId: id },
    });
  }
}
