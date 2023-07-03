import { RefreshSessionDto } from './refresh-session.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRefreshSessionDto extends PartialType(RefreshSessionDto) { }

