import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import "./Converter.css";

import { debounce } from "lodash";
import { getData } from "../api/api";
import { StaticConvertedCurrency } from "../StaticConvertedCurrency";
import { getNornalNum } from "./utils";
import { Loader } from "../Loader";

const getLabel = (code, title) => {
  return title.length > 20
    ? `${code} : ${title.slice(0, 17)}...`
    : `${code} : ${title}`;
};

export const Converter = ({ currencyCodes }) => {
  const [currencyInfo, setCurrencyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [inputValues, setInputValues] = useState({
    from: "1",
    to: "1",
    fromCode: "_",
    toCode: "_",
  });

  const getCurrencyRate = useCallback(
    debounce(async (newValues, type) => {
      if (
        newValues.from > 0 &&
        newValues.to >= 0 &&
        newValues.toCode !== "_" &&
        newValues.fromCode !== "_"
      ) {
        setIsLoading(true);

        const data = await getData(
          `convert?to=${
            type === "to" ? newValues.fromCode : newValues.toCode
          }&from=${
            type === "to" ? newValues.toCode : newValues.fromCode
          }&amount=${type === "to" ? newValues.to : newValues.from}`
        );

        if (data.error) {
          setIsError(true);
        } else {
          setInputValues({
            from: data.query.amount,
            to: data.result,
            fromCode: data.query.from,
            toCode: data.query.to,
          });

          setCurrencyInfo({
            titles: {
              from: data.query.from,
              to: data.query.to,
            },
            data: {
              from: 1,
              to: data.info.rate,
            },
          });
        }

        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handlerChange = (e) => {
    const { name, value } = e.target;

    let validValue = "";

    switch (name) {
      case "from":
      case "to":
        validValue = getNornalNum(value);
        break;

      default:
        validValue = value;
    }

    const newValues = { ...inputValues, [name]: validValue };

    getCurrencyRate(newValues, name);
    setInputValues(newValues);
  };

  return (
    <>
      {isError && <span>Something went wrong</span>}
      <div className="Converter">
        <div className="Converter__inputs">
          <div>
            <h4>From</h4>
            <input
              value={inputValues.from}
              name="from"
              onChange={handlerChange}
            />
            <select
              className="select"
              name="fromCode"
              value={inputValues.fromCode}
              onChange={handlerChange}
              id="select-from"
            >
              <option value="_">Select currency</option>

              {currencyCodes &&
                Object.keys(currencyCodes).map((key) => (
                  <option key={key} value={key}>
                    {getLabel(key, currencyCodes[key])}
                  </option>
                ))}
            </select>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            currencyInfo && (
              <div>
                <h4>Currency rate</h4>
                <StaticConvertedCurrency {...currencyInfo} />
              </div>
            )
          )}
        </div>

        <div className="Converter__inputs">
          <div>
            <h4>To</h4>
            <input value={inputValues.to} name="to" onChange={handlerChange} />
            <select
              className="select"
              name="toCode"
              value={inputValues.toCode}
              onChange={handlerChange}
              id="select-from"
            >
              <option value="_">Select currency</option>

              {currencyCodes &&
                Object.keys(currencyCodes).map((key) => (
                  <option key={key} value={key}>
                    {getLabel(key, currencyCodes[key])}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

Converter.propTypes = {
  currencyCodes: PropTypes.object,
};
