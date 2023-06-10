import { Card, Empty, Table } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { WeeklyReportDto } from "../../@generated/schemas";
import { VisitorsWithDisability } from "./VisitorsWithDisability";

function getGroupLabel({ group, range, t }: any) {
  return (
    <div className="flex flex-row items-center">
      <span className="mr-2">{t(group)}</span>
      <span className="text-xs">
        {range.min} - {range.max || "..."}
      </span>
    </div>
  );
}

export const WeeklyStats = WeeklyStatsDescription;

const columns = (t: (text: string) => string) => [
  { title: t("Gender"), dataIndex: "gender" },
  { title: t("Refugees"), dataIndex: "refugees" },
  { title: t("Locals"), dataIndex: "locals" },
  { title: t("Total"), dataIndex: "total" },
];

export function WeeklyStatsDescription({
  report,
}: {
  report?: WeeklyReportDto;
}) {
  const { t } = useTranslation();
  const cols = useMemo(() => columns(t), [t]);
  console.log(cols);

  if (!report) {
    return <Empty />;
  }
  return (
    <div className={``}>
      {report.groups.map((group) => {
        const table = [
          {
            gender: t(group.males.gender),
            total: group.males.visitors.length,
            refugees: group.males.refugeesCount,
            locals: group.males.localsCount,
          },
          {
            gender: t(group.females.gender),
            total: group.females.visitors.length,
            refugees: group.females.refugeesCount,
            locals: group.females.localsCount,
          },
        ];

        return (
          <Card
            className="mb-5 weekly-report-card"
            extra={
              <span className="text-xs">
                <span className="font-bold">{t("Total")}:</span>{" "}
                <span>{group.visitors.length}</span>
                {' | '}
                <VisitorsWithDisability visitors={group.visitors} />
              </span>
            }
            title={getGroupLabel({ ...group, t })}
          >
            <Table
              bordered
              className="rounded-none border-t-0"
              pagination={false}
              columns={cols}
              dataSource={table}
            />
          </Card>
        );
      })}
    </div>
  );
}
