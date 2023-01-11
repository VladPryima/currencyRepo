import React, { useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  //Стейт для вибору валюти (1 блок)
const [toCurrency, setToCurrency] = React.useState("USD");
  //Стейт для вибору валюти (2 блок)
const [fromCurrency, setFromCurrency] = React.useState("UAH");
  
//Стейт для інпутів (1-й блок)
const [toPrice, setToPrice] = React.useState(0);
  //Стейт для інпутів (2-й блок)
const [fromPrice, setFromPrice] = React.useState(0);



//Зберігаємо список валют
const ratesRef = React.useRef({});
//Завантажуємо JSON і пакуємо в  useRef - ratesRef
React.useEffect(() => {
  fetch('currency.json')
    .then((res) => res.json())
    .then((json) => {
      
      ratesRef.current = json.rates; //Привласнюємо useRef-у, а саме current, як обьект, JSON з валютами
      onChangeToPrice(1); //Початкове значення у полі зліва
    });
}, []); //Залежність у вигляді пустого массива для спрацьовування useEffect усього раз, після рендеру


//1 Обробник для першого інпута - встановлює значення другого (результат)
const onChangeToPrice = (value) => {
 
  const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
  setToPrice(value); //Перше поле
  setFromPrice(result.toFixed(3)); //Друге поле
  
}
//useEffect-у передаємо onChangeToPrice з значенням toPrice
React.useEffect(() => {
 
  onChangeToPrice(toPrice);
  }, [ toCurrency]); 

//2 Другий
const onChangeFromPrice = (value) => {
 
  const result = (ratesRef.current[toCurrency] / ratesRef.current[fromCurrency]) * value;
  setToPrice(result.toFixed(3)); //Перше поле
  setFromPrice(value); //Друге поле
  
}
//useEffect-у передаємо onChangeToPrice з значенням toPrice
React.useEffect(() => {
 
  onChangeFromPrice(fromPrice);
  }, [ fromCurrency]); 
  

 

  const buy = {"USD": 1, "EUR": 1, "GBP": 1};
  const sell = {"USD": 37.37, "EUR": 38.94, "GBP": 44.57};

  const currencyEurope = ["$", "€", "£"];
  const currencyUa = ["UAH", "UAH", "UAH"];

 const buyOrSell = ["Currency", "Cost (UAH)"];

 /*React.useEffect(() => { //Заборона на ввід для другого інпуту
  document.querySelectorAll("input")[1].setAttribute("readonly", "readonly");
 }, []);*/

  return (
    
    <div className="App">
      <h1>Currency exchange</h1>
      <a className="choosePage" href='https://vladpryima.github.io/home/'>&#129080; До вибору проєктів</a>
      <Block 
      value={toPrice} 
      currency={toCurrency} 
      onChangeCurrency={setToCurrency} //Обробник для вибору валюти зі списку
      onChangeValue={onChangeToPrice} 
       direction={`GIVE: ${toCurrency} `}
       obj={buy}
       buySell={buyOrSell[0]}
       currencyIcon={currencyEurope}
       />
      
      <Block 
      value={fromPrice} 
      currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} //Обробник для вибору валюти зі списку
      onChangeValue={onChangeFromPrice} 
      direction={`GET: ${fromCurrency} `}
      obj={sell}
      buySell={buyOrSell[1]}
      currencyIcon={currencyUa}
      />

      
    </div>
  );
}




export default App;
