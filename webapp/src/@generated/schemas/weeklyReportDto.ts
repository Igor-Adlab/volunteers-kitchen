/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * Vol
 * Registration api
 * OpenAPI spec version: 0.1
 */
import type { DailyVisitorDto } from './dailyVisitorDto';
import type { WeeklyAgeGroupDto } from './weeklyAgeGroupDto';

export interface WeeklyReportDto {
  total: number;
  visitors: DailyVisitorDto[];
  groups: WeeklyAgeGroupDto[];
}
