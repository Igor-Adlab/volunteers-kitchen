import { ApiProperty } from "@nestjs/swagger";
import { Gender, VisitorStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class VisitorDto {
    @ApiProperty({
        type: String,
    })
    id: string;

    @IsString()
    @MinLength(5)
    @ApiProperty({
        type: String,
    })
    name: string;

    @Type(() => Date)
    @ApiProperty({
        type: Date,
    })
    birthday: Date;

    @ApiProperty({
        type: Boolean,
    })
    hasDisability: boolean;

    @IsIn([VisitorStatus.Local, VisitorStatus.Refugee])
    @ApiProperty({
        type: String,
        enum: Object.keys(VisitorStatus),
    })
    status: VisitorStatus;

    @IsIn([Gender.Male, Gender.Female])
    @ApiProperty({
        type: String,
        enum: Object.keys(Gender),
    })
    gender: Gender;

    @IsOptional()
    @ApiProperty({
        type: Object,
        isArray: true,
        required: false,
    })
    visits: any;
}
