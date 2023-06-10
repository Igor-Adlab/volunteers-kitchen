import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';

@Module({
  imports: [PrismaModule],
  providers: [VisitorsService],
  controllers: [VisitorsController],
})
export class VisitorsModule {}
