import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from './signup.dto';

export class LogInDto extends PartialType(SignUpDto) {}
