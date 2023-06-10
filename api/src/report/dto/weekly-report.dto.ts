import * as moment from "moment";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToInstance, Type } from "class-transformer";

import { LOCAL_AGE_GROUP_CONFIG, WoldVisionAgeGroup } from "../constants";
import { VisitorDto } from "src/visitors/dto/visitor.dto";
import { getLocalAgeGroup } from "../utils/get-age-group";
import { DailyVisitorDto } from "./daily-report.dto";
import { Gender, VisitorStatus } from "@prisma/client";

export class AgeGroupGenderDto {
    @Type(() => DailyVisitorDto)
    @ApiProperty({
        isArray: true,
        type: DailyVisitorDto,
    })
    visitors: DailyVisitorDto[];

    @ApiProperty({
        enum: Gender,
        type: String,
    })
    gender: Gender;

    @Expose()
    @Type(() => Number)
    @ApiProperty({
        type: Number,
    })
    get localsCount() {
        return this.locals.length;
    }

    @Expose()
    @Type(() => Number)
    @ApiProperty({
        type: Number,
    })
    get refugeesCount() {
        return this.refugees.length;
    }

    @Expose()
    @Type(() => DailyVisitorDto)
    @ApiProperty({
        type: DailyVisitorDto,
    })
    get locals() {
        return this.visitors.filter(({ status }) => status == VisitorStatus.Local);
    }

    @Expose()
    @Type(() => DailyVisitorDto)
    @ApiProperty({
        type: DailyVisitorDto,
    })
    get refugees() {
        return this.visitors.filter(({ status }) => status == VisitorStatus.Refugee); 
    }
}

export class AgeGroupRange {
    @ApiProperty({
        type: Number,
        example: 18,
    })
    @Type(() => Number)
    min: number;

    @ApiProperty({
        example: 59,
        type: Number,
        required: false,
    })
    @Type(() => Number)
    max?: number;
}

export class WeeklyAgeGroupDto {
    @ApiProperty({
        isArray: true,
        type: DailyVisitorDto,
    })
    @Type(() => DailyVisitorDto)
    visitors: DailyVisitorDto[];

   @ApiProperty({
    type: String,
    enum: WoldVisionAgeGroup,
   })
   group: WoldVisionAgeGroup;

   @ApiProperty({
    type: AgeGroupRange,
    enum: WoldVisionAgeGroup,
   })
   range: AgeGroupRange;

   @Expose()
   @Type(() => AgeGroupGenderDto)
   @ApiProperty({
    type: AgeGroupGenderDto,
   })
   get males(): AgeGroupGenderDto {
    const visitors = this.visitors.filter(({ gender }) => gender === Gender.Male);
    return plainToInstance(AgeGroupGenderDto, {
        visitors,
        gender: Gender.Male,
    });
   }

   @Expose()
   @Type(() => AgeGroupGenderDto)
   @ApiProperty({
    type: AgeGroupGenderDto,
   })
   get females(): AgeGroupGenderDto {
    const visitors = this.visitors.filter(({ gender }) => gender === Gender.Female);
    return plainToInstance(AgeGroupGenderDto, {
        visitors,
        gender: Gender.Female,
    });
   }
}

export class WeeklyReportDto {
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

    @Expose()
    @Type(() => WeeklyAgeGroupDto)
    @ApiProperty({
        isArray: true,
        type: WeeklyAgeGroupDto,
    })
    get groups(): WeeklyAgeGroupDto[] {
        const groups = {
            [WoldVisionAgeGroup.Children]: {
                group: WoldVisionAgeGroup.Children,
                range: LOCAL_AGE_GROUP_CONFIG[WoldVisionAgeGroup.Children],
                visitors: this.getVisitorsForGroup(WoldVisionAgeGroup.Children),
            },
            [WoldVisionAgeGroup.Adults]: {
                group: WoldVisionAgeGroup.Adults,
                range: LOCAL_AGE_GROUP_CONFIG[WoldVisionAgeGroup.Adults],
                visitors: this.getVisitorsForGroup(WoldVisionAgeGroup.Adults),
            },
            [WoldVisionAgeGroup.OlderAdults]: {
                group: WoldVisionAgeGroup.OlderAdults,  
                range: LOCAL_AGE_GROUP_CONFIG[WoldVisionAgeGroup.OlderAdults],
                visitors: this.getVisitorsForGroup(WoldVisionAgeGroup.OlderAdults),
            },
        };

        return plainToInstance(WeeklyAgeGroupDto, Object.values(groups));
    }

    private getVisitorsForGroup(group: WoldVisionAgeGroup) {
        return this.visitors.filter((visitor) => group === visitor.group);
    }
}