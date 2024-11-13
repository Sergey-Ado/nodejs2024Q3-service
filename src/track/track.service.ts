import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { favorites } from 'src/database/database';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({
      data: { ...createTrackDto },
    });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    return await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  async remove(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    await this.prisma.track.delete({
      where: { id },
    });

    favorites.tracks = favorites.tracks.filter((trackId) => trackId != id);
  }
}
