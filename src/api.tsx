const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string | undefined) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
        response.json()
    );
}

export async function fetchCoinTicker(coinId: string | undefined) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
        response.json()
    );
}
export async function fetchCoinHistory(coinId: string | undefined) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 23;

    // console.log(coinId);
    // console.log(endDate, startDate);
    return fetch(
        `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    ).then((response) => response.json());
}

// https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical
