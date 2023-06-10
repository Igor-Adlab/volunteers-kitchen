/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * Vol
 * Registration api
 * OpenAPI spec version: 0.1
 */
import type { DailyVisitorDtoStatus } from './dailyVisitorDtoStatus';
import type { DailyVisitorDtoGender } from './dailyVisitorDtoGender';
import type { DailyVisitorDtoVisitsItem } from './dailyVisitorDtoVisitsItem';
import type { DailyVisitorDtoGroup } from './dailyVisitorDtoGroup';

export interface DailyVisitorDto {
  id: string;
  name: string;
  birthday: string;
  hasDisability: boolean;
  status: DailyVisitorDtoStatus;
  gender: DailyVisitorDtoGender;
  visits?: DailyVisitorDtoVisitsItem[];
  age: number;
  group: DailyVisitorDtoGroup;
}