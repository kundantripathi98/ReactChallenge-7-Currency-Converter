// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [convertedAmt, setConvertedAmt] = useState(0);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("INR");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const controller = new AbortController();
      let signal = controller.signal;
      try {
        setError(false);
        let res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currency1}&to=${currency2}`,
          { signal }
        );
        let data = await res.json();
        setConvertedAmt(data.rates[`${currency2}`].toFixed(2));
        console.log(data);
      } catch (err) {
        if (err.message.includes("Cannot read properties of undefined")) {
          setError(true);
        }
      }

      return () => {
        controller.abort();
      };
    }

    fetchData();
  }, [amount, currency1, currency2]);

  return (
    <div>
      <h1>Currency coverter challenge</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {error ? (
        <p>Both currencies are same.</p>
      ) : (
        <p>OUTPUT:- {convertedAmt}</p>
      )}
    </div>
  );
}
