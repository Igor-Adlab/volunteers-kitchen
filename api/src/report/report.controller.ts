import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';

import { ReportService } from './report.service';
import { DateRangeDto } from './dto/date-range.dto';
import { DailyReportDto } from './dto/daily-report.dto';
import { WeeklyReportDto } from './dto/weekly-report.dto';
import { MonthlyReportDto } from './dto/monthly-report.dto';
import { VisitorDto } from 'src/visitors/dto/visitor.dto';

@ApiTags('reports')
@Controller('report')
export class ReportController {
    constructor(
        private readonly report: ReportService,
    ) {}

    @Get('daily')
    @ApiOkResponse({
        type: DailyReportDto,
    })
    async getDailyReport(
        @Query('day') day?: string,
    ) {
        return this.report.getDailyReport(day);
    }

    @Get('/weekly')
    @ApiOkResponse({
        type: WeeklyReportDto,
    })
    async getWeeklyReport(
        @Query() dto?: DateRangeDto,
    ) {
        return this.report.getWeeklyReport(dto.from, dto.to);
    }

    @Get('/monthly')
    @ApiOkResponse({
        type: MonthlyReportDto,
    })
    async getMonthlyReport(
        @Query() dto?: DateRangeDto,
    ) { 
        return this.report.getMonthlyReport(dto.from, dto.to);
    }

    @Get('/extended/monthly')
    @ApiOkResponse({
        isArray: true,
        type: VisitorDto,
    })
    async getExtendedMonthlyReport(
        @Query() dto?: DateRangeDto,
    ) { 
        console.log(JSON.stringify(dto));
        return this.report.getExtendedMonthlyReport(dto.from, dto.to);
    }
}
