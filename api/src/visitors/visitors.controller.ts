import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NewVisitorDto } from './dto/new-visitor.dto';
import { VisitorDto } from './dto/visitor.dto';
import { VisitorsService } from './visitors.service';

@ApiTags('visitors')
@Controller('visitors')
export class VisitorsController {
    constructor(
        private readonly visitors: VisitorsService,
    ) {}

    @Post()
    @ApiOkResponse({
        type: () => VisitorDto,
    })
    async create(@Body() data: NewVisitorDto) {
        const visitor = await this.visitors.create(data);
        await this.visit(visitor.id);

        return visitor;
    }

    @Get('search')
    @ApiOkResponse({
        isArray: true,
        type: () => VisitorDto,
    })
    search(@Query('name') name: string) {
        return this.visitors.search(name);
    }

    @Get()
    @ApiOkResponse({
        isArray: true,
        type: () => VisitorDto,
    })
    list() {
        return this.visitors.list();
    }

    @Post(':visitorId/visit')
    visit(@Param('visitorId') visitorId: string) {
        return this.visitors.visit(visitorId);
    }

    @ApiOkResponse({
        type: () => VisitorDto
    })
    @Patch(':visitorId')
    updateVisitor(
        @Body() data: NewVisitorDto,
        @Param('visitorId') visitorId: string,
    ) {
        return this.visitors.updateVisitor(visitorId, data);
    }
}
