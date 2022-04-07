import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import coinIcons from "base64-cryptocurrency-icons";
import { useQuery } from "react-query";

import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0px auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;
const CoinList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 9px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.1s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const CoinImg = styled.img`
    margin-right: 10px;
    width: 35px;
    height: 35px;
`;

const Loading = styled.span`
    text-align: center;
    display: block;
`;

interface ICoins {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);

    /*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const coins = await (
                await fetch("https://api.coinpaprika.com/v1/coins")
            ).json();

            setCoins(
                coins.filter(
                    (coin: CoinInterface) =>
                        coin.is_active && 0 < coin.rank && coin.rank < 100
                )
            );
            setLoading(false);
        })();
    }, []);
    */

    return (
        <Container>
            <Header>
                <Title>비트코인</Title>
            </Header>

            {isLoading ? (
                <Loading>Loading...</Loading>
            ) : (
                <CoinList>
                    {data
                        ?.filter(
                            (coin: ICoins) =>
                                coin.is_active &&
                                0 < coin.rank &&
                                coin.rank < 100
                        )
                        .map((coin) => (
                            <Coin key={coin.id}>
                                <Link
                                    to={`/${coin.id}`}
                                    state={{ name: coin.name }}
                                >
                                    <CoinImg
                                        src={
                                            coinIcons[coin.symbol.toUpperCase()]
                                                ?.icon
                                        }
                                    />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        ))}
                </CoinList>
            )}
        </Container>
    );
}

export default Coins;
