import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  //Перший блок: ЩО конвертуємо
const [fromCurrency, setFromCurrency] = React.useState("UAH");
  //Другий блок: У що конвертуємо
const [toCurrency, setToCurrency] = React.useState("USD");

  //Поле 
const [fromPrice, setFromPrice] = React.useState(0);
const [toPrice, setToPrice] = React.useState(1);

//const [rates, setRates] = React.useState({});
const ratesRef = React.useRef({});

React.useEffect(() => {
  fetch('currency.json')
    .then((res) => res.json())
    .then((json) => {
      //setRates(json.rates);
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    });
}, []);

//Зміна кількості валюти у полі зліва (ЩО)
const onChangeFromPrice = (value) => {
  const price = value / ratesRef.current[fromCurrency];
  const result = price * ratesRef.current[toCurrency];
  setFromPrice(value);
  setToPrice(result.toFixed(3));
}
//Зміна кількосьті валюти у полі зправа (У ЩО)
const onChangeToPrice = (value) => {
  const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
  setFromPrice(result.toFixed(3));
  setToPrice(value);
}

React.useEffect(() => {
onChangeFromPrice(fromPrice);
}, [fromCurrency]);

React.useEffect(() => {
  onChangeToPrice(toPrice);
  }, [toCurrency]);


  return (
    <div className="App">
      <a className="choosePage" href='https://vladpryima.github.io/home/'>&#129080; До вибору проєктів</a>
      <Block 
      value={fromPrice} 
      currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} 
      onChangeValue={onChangeFromPrice}/>

      <Block 
      value={toPrice} 
      currency={toCurrency} 
      onChangeCurrency={setToCurrency} 
       onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
