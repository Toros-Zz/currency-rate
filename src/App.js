import { Header } from "./components/Header";
import "./App.css";
import { Converter } from "./components/Converter";
import { useEffect, useState } from "react";
import { getData } from "./components/api/api";
import { Loader } from "./components/Loader";

function App() {
  const [currencyCodes, setCurrencyCodes] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCurrencyCodes();
  }, []);

  const loadCurrencyCodes = async () => {
    setIsLoading(true);

    const data = await getData("symbols");

    if (data.error) {
      setIsError(true);
    } else {
      setCurrencyCodes(data.symbols);
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <Header />

      {isError && <span>Something went wrong</span>}

      {!isError && (
        <div className="App__content">
          {isLoading ? <Loader /> : <Converter currencyCodes={currencyCodes} />}
        </div>
      )}
    </div>
  );
}

export default App;
