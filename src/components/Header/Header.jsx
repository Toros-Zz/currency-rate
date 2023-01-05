import { useEffect, useState } from "react";
import { ActiveDateTime } from "../ActiveDateTime";
import { getData } from "../api/api";
import { Loader } from "../Loader";
import { StaticConvertedCurrency } from "../StaticConvertedCurrency";
import "./Header.css";

export const Header = () => {
  const [currencyRateList, setCurrencyRateList] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadRate();
  }, []);

  const loadRate = async () => {
    setIsLoading(true);

    const dataEUR = await getData("convert?to=UAH&from=EUR&amount=1");
    const dataUSD = await getData("convert?to=UAH&from=USD&amount=1");

    if (dataEUR.error || dataUSD.error) {
      setIsError(true);
    } else {
      setCurrencyRateList([dataEUR, dataUSD]);
    }

    setIsLoading(false);
  };

  return (
    <header className="Header">
      {isError ? (
        <span>Something went wrong</span>
      ) : isLoading ? (
        <Loader />
      ) : (
        <ul className="Header__CurrencyBlock">
          {currencyRateList &&
            currencyRateList.map((el, i) => (
              <li className="Header__liItem" key={i}>
                <StaticConvertedCurrency
                  titles={{
                    from: el.query.from,
                    to: el.query.to,
                  }}
                  data={{
                    from: 1,
                    to: el.result,
                  }}
                />
              </li>
            ))}
        </ul>
      )}

      <h1>Currency rate</h1>
      <ActiveDateTime />
    </header>
  );
};
