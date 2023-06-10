import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { VisitorsModule } from './visitors/visitors.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    VisitorsModule,
    ReportModule,
  ],
})
export class AppModule {}
