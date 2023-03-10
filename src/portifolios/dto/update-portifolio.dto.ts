import { PartialType } from '@nestjs/swagger';
import { CreatePortifolioDto } from './create-portifolio.dto';

export class UpdatePortifolioDto extends PartialType(CreatePortifolioDto) {}
