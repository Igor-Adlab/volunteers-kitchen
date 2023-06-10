import { List, Table } from "antd";
import { VisitorDto, VisitorDtoVisitsItem } from "../../@generated/schemas";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import moment from "moment";

const getVisitorsColumns = (t: any): ColumnsType<VisitorDtoVisitsItem> => [
  {
    title: t("visits"),
    dataIndex: "createdAt",
    render: (value) => moment(value).format("L"),
  },
];

export function ExtendedMonthlyReportView({
  visitors = [],
  isLoading,
}: {
  visitors: VisitorDto[];
  isLoading?: boolean;
}) {
  const { t } = useTranslation();
  const columns = useMemo(() => getVisitorsColumns(t), [t]);

  return (
    <List
      bordered
      loading={isLoading}
      dataSource={visitors}
      renderItem={(item) => (
        <List.Item className="p-0 mb-3">
          <List.Item.Meta
            title={
              <span className="px-4 py-3 mb-5">
                {item.name} - {t(item.gender)} 
                {" | "}
                {moment().diff(moment(item.birthday), 'years')}
                {item.hasDisability ? ` | ${t('with_disability')}` : null}
              </span>
            }
            description={
              <>
                <Table pagination={false} dataSource={item.visits || []} columns={columns} />
              </>
            }
          />
        </List.Item>
      )}
    />
  );
}
