import styled from "styled-components";
import { Link } from "react-router-dom";
import coinIcons from "base64-cryptocurrency-icons";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0px auto;
    margin-top: 1rem;
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
    const setIsDark = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setIsDark((prev) => !prev);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>

            <Header>
                <Title>비트코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button>
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
