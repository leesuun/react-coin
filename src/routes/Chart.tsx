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
        { refetchInterval: 6000 * 30 }
    );

    // data?.map((price) => {
    //     new Date(price.time_close),
    //         [
    //             price.open,
    //             price.high,
    //             price.close,
    //             price.close,
    //         ];
    // }),

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ReactApexChart
                    type="candlestick"
                    // series={[
                    //     {
                    //         name: "Price",
                    //         data: data?.map((price) => price.close) as number[],
                    //     },
                    // ]}

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
                            theme: "dark",
                        },
                    }}

                    // options={{
                    //     theme: {
                    //         mode: "dark",
                    //     },
                    //     chart: {
                    //         height: 300,
                    //         width: 500,
                    //         toolbar: {
                    //             show: false,
                    //         },
                    //         background: "transparent",
                    //     },
                    //     grid: { show: false },
                    //     stroke: {
                    //         curve: "smooth",
                    //         width: 4,
                    //     },
                    //     yaxis: {
                    //         show: false,
                    //     },
                    //     xaxis: {
                    //         axisBorder: { show: false },
                    //         axisTicks: { show: false },
                    //         labels: {
                    //             show: false,
                    //         },
                    //         type: "datetime",
                    //         categories: data?.map((price) => price.time_close),
                    //     },
                    //     fill: {
                    //         type: "gradient",
                    //         gradient: { gradientToColors: ["blue"] },
                    //     },
                    //     colors: ["red"],
                    //     tooltip: {
                    //         y: {
                    //             formatter: (value) => `${value.toFixed(3)}`,
                    //         },
                    //     },
                    // }}
                />
            )}
        </div>
    );
}

export default Chart;
