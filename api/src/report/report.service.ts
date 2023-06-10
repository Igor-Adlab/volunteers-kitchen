import * as moment from 'moment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { PrismaService } from 'src/prisma/prisma.service';
import { DailyReportDto } from './dto/daily-report.dto';
import { WeeklyReportDto } from './dto/weekly-report.dto';
import { MonthlyReportDto } from './dto/monthly-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async getDailyReport(dateRaw?: string) {
    const date = moment(dateRaw);
    if (!date.isValid()) {
      return new BadRequestException(date, `Invalid date - ${dateRaw}`);
    }

    const end = moment(date).endOf('day').toISOString(false);
    const start = moment(date).startOf('day').toISOString(false);

    const visits = await this.prisma.visits.findMany({
      where: {
        createdAt: {
          lte: end,
          gte: start,
        },
      },
      include: { visitor: true },
    });

    const visitors = visits.map(({ visitor }) => visitor);
    const report = plainToInstance(DailyReportDto, { visitors });

    return instanceToPlain(report);
  }

  async getWeeklyReport(fromRaw?: string, toRaw?: string) {
    const to = moment(toRaw).endOf('day');
    const from = moment(fromRaw).startOf('day');

    if (!to.isValid() || !from.isValid()) {
      throw new BadRequestException(
        { from, to },
        `Invalid date range: ${fromRaw} - ${toRaw}`,
      );
    }

    const visits = await this.prisma.visits.findMany({
      include: { visitor: true },
      where: {
        createdAt: {
          lte: to.toISOString(false),
          gte: from.toISOString(false),
        },
      },
    });

    const visitors = visits.map(({ visitor }) => visitor);
    const report = plainToInstance(WeeklyReportDto, { visitors });

    return instanceToPlain(report);
  }

  async getMonthlyReport(fromRaw?: string, toRaw?: string) {
    const to = moment(toRaw).endOf('day');
    const from = moment(fromRaw).startOf('day');

    if (!to.isValid() || !from.isValid()) {
      throw new BadRequestException(
        { from, to },
        `Invalid date range: ${fromRaw} - ${toRaw}`,
      );
    }

    const visits = await this.prisma.visits.findMany({
      include: { visitor: true },
      where: {
        createdAt: {
          lte: to.toISOString(false),
          gte: from.toISOString(false),
        },
      },
    });

    const visitors = visits.map(({ visitor }) => visitor);
    const report = plainToInstance(MonthlyReportDto, { visitors });

    return instanceToPlain(report);
  }

  async getExtendedMonthlyReport(fromRaw?: string, toRaw?: string) {
    const to = moment(toRaw).endOf('day');
    const from = moment(fromRaw).startOf('day');

    return this.prisma.visitor.findMany({
      distinct: 'id',
      where: {
        visits: {
          some: {
            createdAt: {
              lte: to.toISOString(false),
              gte: from.toISOString(false),
            },
          },
        },
      },
      include: {
        visits: {
          where: {
            createdAt: {
              lte: to.toISOString(false),
              gte: from.toISOString(false),
            },
          },
        },
      },
    });
  }
}
