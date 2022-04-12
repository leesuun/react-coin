import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api";
import { isDarkAtom } from "../atoms";

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
        { refetchInterval: 6000 * 30 }
    );
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ReactApexChart
                    type="candlestick"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => {
                                return {
                                    x: Date.parse(price.time_close),
                                    y: [
                                        price.open,
                                        price.high,
                                        price.low,
                                        price.close,
                                    ],
                                };
                            }) as { x: number; y: number[] }[],
                        },
                    ]}
                    options={{
                        chart: {
                            type: "candlestick",
                            height: 350,
                        },
                        title: {
                            text: "CandleStick Chart",
                            align: "left",
                        },
                        xaxis: {
                            title: {
                                style: {
                                    color: "yellow",
                                },
                            },
                            labels: {
                                style: {
                                    colors: ["green"],
                                },
                            },
                            type: "datetime",
                        },
                        yaxis: {
                            labels: {
                                formatter: (value) => value.toFixed(1),
                                style: {
                                    colors: ["green"],
                                },
                            },
                            tooltip: {
                                enabled: true,
                            },
                        },
                        tooltip: {
                            theme: isDark ? "dark" : "light",
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
