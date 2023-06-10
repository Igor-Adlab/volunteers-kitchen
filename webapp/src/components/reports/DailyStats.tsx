import { PlusOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  DailyReportDto,
  DailyVisitorDto,
  DailyVisitorDtoGroup,
  VisitorDto,
  VisitorDtoGender,
  VisitorDtoStatus,
} from "../../@generated/schemas";
import moment from "moment";

export interface IDailyStatsProps {
  report?: DailyReportDto;
  onRowClick(visitor: VisitorDto): void;
}

type TranslationType = TFunction<"translation", undefined, "translation">;

const createColumnRenderer =
  ({
    t,
    group,
    gender,
    status,
    hasDisability,
  }: {
    t: TranslationType;
    group: DailyVisitorDtoGroup;
    hasDisability: boolean;
    gender: VisitorDtoGender;
    status: VisitorDtoStatus;
  }) =>
  (row: DailyVisitorDto) => {
    if (row.group === group && gender === row.gender && status === row.status && row.hasDisability === hasDisability) {
      return <PlusOutlined />;
    }

    return null;
  };

function createAgeGroupColumns({
  group,
  t,
}: {
  group: DailyVisitorDtoGroup;
  t: TranslationType;
}) {
  return (
    <>
      <ColumnGroup title={t(group)}>
        {createGenderColumns({ group, gender: "Male", t })}
        {createGenderColumns({ group, gender: "Female", t })}
      </ColumnGroup>
    </>
  );
}

function createGenderColumns({
  gender,
  group,
  t,
}: {
  gender: VisitorDtoGender;
  group: DailyVisitorDtoGroup;
  t: TranslationType;
}) {
  return (
    <>
      <ColumnGroup title={t(gender)}>
        {createStatusColumn({ gender, group, status: "Local", t })}
        {createStatusColumn({ gender, group, status: "Refugee", t })}
      </ColumnGroup>
    </>
  );
}

function createStatusColumn({
  status,
  gender,
  group,
  t,
}: {
  t: TranslationType;
  status: VisitorDtoStatus;
  gender: VisitorDtoGender;
  group: DailyVisitorDtoGroup;
}) {
  return (
    <>
      <ColumnGroup title={t(status)}>
      <Column
        className="text-center"
        title={t('disability__short')}
        render={createColumnRenderer({ group, gender, status, t, hasDisability: true })}
      />
      <Column
        className="text-center"
        title={t('no_disability__short')}
        render={createColumnRenderer({ group, gender, status, t, hasDisability: false })}
      />
      </ColumnGroup>
    </>
  );
}

export function DailyStats({ report, onRowClick }: IDailyStatsProps) {
  const { t } = useTranslation();
  return (
    <Table
      rowClassName={({ gender }) =>
        gender === "Female" ? "bg-pink-50" : "bg-blue-50"
      }
      onRow={row => ({
        onClick: () => onRowClick(row),
      })}
      pagination={false}
      size="small"
      className="daily-report-table"
      bordered
      dataSource={report?.visitors || []}
    >
      <Column title={t("Name")} dataIndex="name" key="name" />
      <Column title={t("Birthday")} dataIndex="birthday" render={bday => moment(bday).format("L")} key="name" />
      {createAgeGroupColumns({ group: "Children", t })}
      {createAgeGroupColumns({ group: "Adults", t })}
      {createAgeGroupColumns({ group: "OlderAdults", t })}
    </Table>
  );
}
