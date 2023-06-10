import { Card, Empty, Table } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MonthlyReportDto } from "../../@generated/schemas";
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

const columns = (t: (text: string) => string) => [
  { title: t("Gender"), dataIndex: "gender" },
  { title: t("Refugees"), dataIndex: "refugees" },
  { title: t("Locals"), dataIndex: "locals" },
  { title: t("Total"), dataIndex: "total" },
];

export function MonthlyStats({
  report,
  price,
}: {
  report?: MonthlyReportDto;
  price: number;
}) {
  const { t } = useTranslation();
  const cols = useMemo(() => columns(t), [t]);

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
            title={getGroupLabel({ ...group, t })}
            extra={
              <>
                <span className="text-xs mr-2">
                  <span className="font-bold">{t("Total")}:</span>{" "}
                  <span>{group.visitors.length}</span>
                </span>
                <span className="text-xs">
                  <VisitorsWithDisability visitors={group.visitors} />
                </span>
                {' | '}
                <span className="text-xs ">
                  <span className="font-bold">{t("Amount")}:</span>{" "}
                  <span>${group.visitors.length * price}</span>
                </span>
              </>
            }
          >
            <Table
              bordered
              columns={cols}
              pagination={false}
              dataSource={table}
              className="rounded-none border-t-0"
            />
          </Card>
        );
      })}
    </div>
  );
}
