import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({
      data: { ...createArtistDto },
    });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    return await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist)
      throw new HttpException("artist doesn't exist", StatusCodes.NOT_FOUND);
    await this.prisma.artist.delete({
      where: { id },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    let favorites = await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });
    if (!favorites)
      favorites = await this.prisma.favorites.create({
        data: { artists: [], albums: [], tracks: [] },
      });
    favorites.artists = favorites.artists.filter((artistId) => artistId != id);
    await this.prisma.favorites.update({
      where: { id: 1 },
      data: { artists: favorites.artists },
    });
  }
}
