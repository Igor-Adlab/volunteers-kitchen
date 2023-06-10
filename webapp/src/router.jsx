import { createBrowserRouter } from "react-router-dom";
import { DailyReport } from "./pages/DailyReport";
import { MonthlyReport } from "./pages/MonthlyReport";
import { QuickSearchPage } from "./pages/QuickSearch";
import { Registration } from "./pages/Registration";
import { WeeklyReport } from "./pages/WeeklyReport";
import { ExtendedMonthlyReport } from "./pages/ExtendedMonthlyReport";

export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <QuickSearchPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/stats",
    element: <WeeklyReport />,
  },
  {
    path: "/stats/daily",
    element: <DailyReport />,
  },
  {
    path: "/stats/monthly",
    element: <MonthlyReport />,
  },
  {
    path: "/stats/extended/monthly",
    element: <ExtendedMonthlyReport />,
  },
]);
