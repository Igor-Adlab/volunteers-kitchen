import moment from "moment";
import { DatePicker, Modal } from "antd";
import { useMemo, useState } from "react";
import { useReportControllerGetDailyReport } from "../@generated/default/default";
import { DailyStats } from "../components/reports/DailyStats";
import { useTranslation } from "react-i18next";
import { VisitorDto } from "../@generated/schemas";
import { VisitorForm } from "../components/VisitorForm";
import { useVisitorsControllerUpdateVisitor } from "../@generated/visitors/visitors";

const current = moment().startOf("day");

export function DailyReport() {
  const { t } = useTranslation();
  const [day, setDay] = useState<moment.Moment>(current);
  const [visitor, setVisitor] = useState<VisitorDto | undefined>(undefined);

  const now = useMemo(() => day.isValid() ? day.format('L') : null, [day]);
  const daily$ = useReportControllerGetDailyReport(
    { day: day.startOf('day').format('YYYY-MM-DDTHH:mm:ss') },
    { query: { enabled: !!now } }
  );

  const update$ = useVisitorsControllerUpdateVisitor({
    mutation: {
      onSuccess: () => {
        daily$.refetch();
        setVisitor(undefined);
      },
    }
  })

  const onSetRange = (_: any, date: string) => setDay(moment(date));

  const onOpenVisitorForm = (visitor: VisitorDto) => setVisitor(visitor);
  const onSaveVisitor = (data: VisitorDto) => {
    if(!visitor) {
      return
    }

    return update$.mutate({
      data,
      visitorId: visitor.id,
    })
  };

  return (
    <div className="print:block ">
      <div style={{ margin: '0 12px' }}>
        <h1 className="text-2xl text-center">
          <span className="">{now}</span>
          {' | '}
          <span>{t('Total')}: {daily$.data?.total}</span>
        </h1>
        <div className="text-center print:hidden mt-3 mb-3">
          <DatePicker
            picker="date"
            format="YYYY/MM/DD"
            onChange={onSetRange}
          />
        </div>
        <DailyStats 
          report={daily$.data}
          onRowClick={onOpenVisitorForm}
        /> 
      </div>
      <Modal destroyOnClose onCancel={() => setVisitor(undefined)} open={!!visitor?.id} title={visitor?.name} footer={null}>
          <VisitorForm isLoading={false} values={visitor} onFinish={onSaveVisitor} />
      </Modal>
    </div>
  );
}
