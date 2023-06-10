import { ApiProperty } from "@nestjs/swagger";
import { Gender, VisitorStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsString, MinLength } from "class-validator";

export class NewVisitorDto {
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

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
    })
    hasDisability: boolean;
}
