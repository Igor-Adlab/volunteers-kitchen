import { DatePicker } from "antd";
import moment from "moment";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportControllerGetWeeklyReport } from "../@generated/default/default";
import { WeeklyStats } from "../components/reports/WeeklyStats";

const current = [moment().startOf("week"), moment().endOf("week")];

export function WeeklyReport() {
  const { t } = useTranslation();
  const [range, setRange] = useState<moment.Moment[]>(current);

  const end = useMemo(
    () => (range[1].isValid() ? range[1].format("DD/MM/YYYY") : null),
    [range]
  );
  const start = useMemo(
    () => (range[0].isValid() ? range[0].format("DD/MM/YYYY") : null),
    [range]
  );

  const weekly$ = useReportControllerGetWeeklyReport(
    {
      to: range[1].format("YYYY-MM-DDTHH:mm:ss"),
      from: range[0].format("YYYY-MM-DDTHH:mm:ss"),
    },
    { query: { enabled: !!start && !!end } }
  );

  const onSetRange = (_: any, [start, end]: string[]) => {
    setRange([moment(start).startOf("day"), moment(end).endOf("day")]);
  };

  return (
    <div className="print:block">
      <div className="text-center print:hidden mt-3 mb-3">
        <DatePicker.RangePicker format="YYYY/MM/DD" onChange={onSetRange} />
      </div>

      <div style={{ width: 560, margin: "0 auto" }}>
        <h1 className="text-2xl text-center">
          {start} - {end}
        </h1>
        <>
            <h2 className="text-center">
              {t("Total")}: {weekly$.data?.visitors?.length}
              {' | '}
              <span>{t("with_disability")}:</span>{" "}
              <span>
                {
                  weekly$.data?.visitors.filter(
                    (visitor) => visitor.hasDisability
                  ).length
                }
              </span>
            </h2>
          </>

        <WeeklyStats report={weekly$.data} />
      </div>
    </div>
  );
}
