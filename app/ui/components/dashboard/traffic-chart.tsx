import { generateYAxis } from '@/app/utils/chartAxis';
import { CalendarIcon } from '@heroicons/react/24/outline';
import {Visit} from "@/app/interfaces/Visits/Visit";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function TrafficChart() {
  const visitsValues: Visit[] = [
    { month: 'Ene', traffic: 2000 },
    { month: 'Feb', traffic: 1800 },
    { month: 'Mar', traffic: 2200 },
    { month: 'Abr', traffic: 2500 },
    { month: 'May', traffic: 2300 },
    { month: 'Jun', traffic: 3200 },
    { month: 'Jul', traffic: 3500 },
    { month: 'Ago', traffic: 3700 },
    { month: 'Sep', traffic: 2500 },
    { month: 'Oct', traffic: 2800 },
    { month: 'Nov', traffic: 3000 },
    { month: 'Dic', traffic: 4800 },
  ];

  const getLatestVisits = () => {
    const currentMonthIndex = new Date().getMonth();
    const previous11Months = [];

    for (let i = 0; i < 11; i++) {
      const monthIndex = (currentMonthIndex - i + 12) % 12;
      previous11Months.push(visitsValues[monthIndex]);
    }

    return previous11Months.reverse();
  }

  const visits = getLatestVisits();

  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(visits);

  if (!visits || visits.length === 0) {
    return <p className="mt-4 text-gray-400">Sin información disponible.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl font-semibold text-background`}>
        Tráfico reciente
      </h2>

      {<div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-lg bg-gray-600 p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {visits.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-background"
                style={{
                  height: `${(chartHeight / topLabel) * month.traffic}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Últimos 12 meses</h3>
        </div>
      </div>}
    </div>
  );
}
