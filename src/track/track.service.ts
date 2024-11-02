import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track, tracks } from 'src/database/database';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuid(),
      ...createTrackDto,
    };
    tracks.push(track);
    return track;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    const track = tracks.find((track) => track.id == id);
    if (!track)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = tracks.find((track) => track.id == id);
    if (!track)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  remove(id: string) {
    const indexTrack = tracks.findIndex((track) => track.id == id);
    if (indexTrack == -1)
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    tracks.splice(indexTrack, 1);
    return `Track id=${id} deleted`;
  }
}
