import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDateString } from "class-validator";
import * as moment from "moment";

export class DateRangeDto {
    @IsDateString({ strict: false })
    @ApiProperty({
        type: Date,
    })
    to: string;

    @IsDateString({ strict: false })
    @ApiProperty({
        type: Date,
    })
    from: string;
}