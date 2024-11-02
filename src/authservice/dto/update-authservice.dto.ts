import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthserviceDto } from './create-authservice.dto';

export class UpdateAuthserviceDto extends PartialType(CreateAuthserviceDto) {}
