import {Visit} from "@/app/interfaces/Visits/Visit";

export const generateYAxis = (revenue: Visit[]) => {
    // Calculate what labels we need to display on the y-axis
    // based on highest record and in 1000s
    const yAxisLabels = [];
    const highestRecord = Math.max(...revenue.map((month) => month.traffic));
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;

    for (let i = topLabel; i >= 0; i -= 1000) {
        yAxisLabels.push(`${i / 1000}K`);
    }

    return { yAxisLabels, topLabel };
};