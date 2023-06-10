import moment from "moment";
import { DatePicker } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportControllerGetExtendedMonthlyReport } from "../@generated/reports/reports";
import { ExtendedMonthlyReportView } from "../components/reports/ExtendedMonthlyReport";

const current = moment().startOf("month");

export function ExtendedMonthlyReport() {
  const { t } = useTranslation();
  const [month, setMonth] = useState<moment.Moment>(current);

  const end = useMemo(
    () => (month.isValid() ? month.endOf('month').format("DD/MM/YYYY") : null),
    [month]
  );
  const start = useMemo(
    () => (month.isValid() ? month.startOf('month').format("DD/MM/YYYY") : null),
    [month]
  );

  const report$ = useReportControllerGetExtendedMonthlyReport(
    {
      to: month.endOf('month').format("YYYY-MM-DDTHH:mm:ss"),
      from: month.startOf('month').format("YYYY-MM-DDTHH:mm:ss"),
    },
    { query: { enabled: !!start && !!end } }
  );

  const onSetRange = (month: any) => setMonth(month);

  return (
    <div className="print:block">
      <div style={{ width: 560, margin: "0 auto" }}>
        <div className="text-center print:hidden mt-3 mb-3 flex flex-row items-center justify-center">
          <DatePicker
            picker="month"
            format="YYYY/MM/DD"   
            onChange={onSetRange}
            className="mr-2 flex-grow"
          />
        </div>

        <h1 className="text-2xl text-center">
          {start} - {end}
        </h1>
        {report$.data?.length ? (
          <>
            <h2 className="text-center text-lg">
              <span>
                {t("Total")}: {report$.data?.length}
              </span>
            </h2>
          </>
        ) : null}

        <ExtendedMonthlyReportView visitors={report$.data || []} isLoading={report$.isLoading} />
      </div>
    </div>
  );
}
