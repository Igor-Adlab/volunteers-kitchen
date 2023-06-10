import * as moment from "moment";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { WoldVisionAgeGroup } from "../constants";
import { VisitorDto } from "src/visitors/dto/visitor.dto";
import { getLocalAgeGroup } from "../utils/get-age-group";

export class DailyVisitorDto extends VisitorDto {
    @Expose({ name: 'age' })
    @ApiProperty({
        type: Number
    })
    public get age() {
        return moment().diff(this.birthday, 'years');
    }

    @ApiProperty({
        type: String,
        enum: WoldVisionAgeGroup,
        default: WoldVisionAgeGroup.Adults,
    })
    @Expose({ name: 'group' })
    public get group() {
        return getLocalAgeGroup(this.age);
    }
}

export class DailyReportDto {
    @Expose()
    @ApiProperty({
        type: Number
    })
    public get total() {
        return this.visitors.length;
    }

    @Type(() => DailyVisitorDto)
    @ApiProperty({
        isArray: true,
        type: DailyVisitorDto,
    })
    visitors: DailyVisitorDto[];
}