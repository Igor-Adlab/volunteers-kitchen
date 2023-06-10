import * as moment from 'moment';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewVisitorDto } from './dto/new-visitor.dto';

@Injectable()
export class VisitorsService {
    logger = new Logger(VisitorsService.name);

    constructor(
        protected readonly prisma: PrismaService,
    ) {}

    async list() {
        return this.prisma.visitor.findMany();
    }

    async search(name: string) {
        return this.prisma.visitor.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        })
    }

    async create(dto: NewVisitorDto) {
        return this.prisma.visitor.create({
            data: dto,
        });
    }

    async updateVisitor(visitorId: string, dto: NewVisitorDto) {
        return this.prisma.visitor.update({
            data: dto,
            where: { id: visitorId },
        });
    }

    async visit(visitorId: string) {
        const existing = await this.prisma.visits.findFirst({
            where: {
                visitorId,
                createdAt: {
                    lte: moment().endOf('day').toDate(),
                    gte: moment().startOf('day').toDate(),
                }
            }
        });
        
        if(existing) {
            return false;
        }

        this.logger.log(`${visitorId} is new today!`);
        await this.prisma.visits.create({
            data: {
                visitor: { connect: { id: visitorId } },
            }
        });

        return  true;
    }
}
