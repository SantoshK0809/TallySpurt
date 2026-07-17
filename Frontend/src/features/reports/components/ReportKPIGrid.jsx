import { formatINR } from "../../../lib/storeHelpers.jsx";
import ReportKPI from "./ReportKPI.jsx";

export default function ReportKPIGrid({
  totalRevenue,
  totalBills,
  averageBillValue,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <ReportKPI label="Total Revenue" value={formatINR(totalRevenue)} />

      <ReportKPI
        label="Total Bills"
        value={totalBills.toLocaleString("en-IN")}
      />

      <ReportKPI label="Avg. Bill Value" value={formatINR(averageBillValue)} />
    </div>
  );
}
