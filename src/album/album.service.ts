import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, albums, favorites, tracks } from 'src/database/database';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: { ...createAlbumDto },
    });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    return await this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
  }

  async remove(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album)
      throw new HttpException("album doesn't exists", StatusCodes.NOT_FOUND);
    await this.prisma.album.delete({
      where: { id },
    });

    tracks
      .filter((track) => track.albumId == id)
      .forEach((track) => (track.albumId = null));

    favorites.albums = favorites.albums.filter((albumId) => albumId != id);

    return `Album id=${id} deleted`;
  }
}
