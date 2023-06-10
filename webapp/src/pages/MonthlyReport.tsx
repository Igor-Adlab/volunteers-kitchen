import moment from "moment";
import { useMemo, useState } from "react";
import { DatePicker, Divider, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

import { MonthlyStats } from "../components/reports/MonthlyStats";
import { useReportControllerGetMonthlyReport } from "../@generated/reports/reports";

const current = [moment().startOf("week"), moment().endOf("week")];

export function MonthlyReport() {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number>(4);
  const [range, setRange] = useState<moment.Moment[]>(current);

  const end = useMemo(
    () => (range[1].isValid() ? range[1].format("DD/MM/YYYY") : null),
    [range]
  );
  const start = useMemo(
    () => (range[0].isValid() ? range[0].format("DD/MM/YYYY") : null),
    [range]
  );

  const weekly$ = useReportControllerGetMonthlyReport(
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
      <div style={{ width: 560, margin: "0 auto" }}>
        <div className="text-center print:hidden mt-3 mb-3 flex flex-row items-center justify-center">
          <DatePicker.RangePicker
            format="YYYY/MM/DD"
            onChange={onSetRange}
            className="mr-2 flex-grow"
          />
          <InputNumber
            min={1}
            value={price}
            className="ml-2"
            addonAfter={"$"}
            onChange={(val) => setPrice(val || 0)}
          />
        </div>

        <h1 className="text-2xl text-center">
          {start} - {end}
        </h1>
        {weekly$.data?.total ? (
          <>
            <h2 className="text-center text-lg">
              <span>
                {t("Total")}: {weekly$.data?.total}
              </span>
                {' | '}
              <span>{t("with_disability")}:</span>{" "}
              <span>
                {
                  weekly$.data?.visitors.filter(
                    (visitor) => visitor.hasDisability
                    ).length
                  }
              </span>
              {' | '}
              <span>
                {t("Amount")}: ${weekly$.data?.total * price}
              </span>
            </h2>
          </>
        ) : null}

        <MonthlyStats price={price} report={weekly$.data} />
      </div>
    </div>
  );
}
