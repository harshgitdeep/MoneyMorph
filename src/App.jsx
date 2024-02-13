import React, { useState, useEffect } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const fromOptions = Object.keys(currencyInfo);
  const toOptions = Object.keys(useCurrencyInfo(to));

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    const rate = currencyInfo[to];
    setConvertedAmount(amount * rate);
  }, [amount, currencyInfo, to]);

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/011/115/353/non_2x/economy-situation-concept-financial-business-statistics-with-bar-graph-and-candlestick-chart-show-stock-market-price-and-currency-exchange-on-blue-background-vector.jpg')` }}>
      <div className="w-full">
      <h1 className="text-5xl pt-10 font-bold text-center text-white my-5">MoneyMorph</h1>
      <h2 className="text-2xl font-bold text-center text-white/60 my-5">"Your one-stop solution for all currency exchange conversions!"</h2>
      
  <h2 className="text-lg font-semibold text-center text-white/30 mb-5">Powered by <a href="https://github.com/fawazahmed0/currency-api" target="_blank" rel="noopener noreferrer">Currency-API</a></h2>
        <div className="w-full max-w-md mx-auto border border-white/30 rounded-lg p-6 backdrop-blur-sm bg-white/30">
          <form>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={fromOptions}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-800 rounded-md bg-blue-200 text-black px-2 py-0.5 hover:bg-blue-300" onClick={swap}>
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={toOptions}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center text-gray-500 text-sm py-3">
        © 2024 Currency Converter App. <a href="https://github.com/harshgitdeep" target='_blank'>harshgitdeep</a>. All rights reserved. 
      </footer>
    </div>
  );
}

export default App;
