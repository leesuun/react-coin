import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
    coinId: string | undefined;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        { refetchInterval: 5000 }
    );

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ReactApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => price.close) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: {
                                show: false,
                            },
                            type: "datetime",
                            categories: data?.map((price) => price.time_close),
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["blue"] },
                        },
                        colors: ["red"],
                        tooltip: {
                            y: {
                                formatter: (value) => `${value.toFixed(3)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
