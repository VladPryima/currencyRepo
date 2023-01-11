import React from 'react';

const defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP']; //Массив для створення 4-х пунктів списку (вибір валюти) 1.1

export const Block = ({ value, currency, onChangeValue, onChangeCurrency, direction, obj, buySell, currencyIcon }) => (
  <div className="block">

    <ul className="currencies">
      {defaultCurrencies.map((cur) => ( //Створюємо список валют 1.2
        <li
          onClick={() => onChangeCurrency(cur)} //Обробник для вибору валюти зі списку 1.3
          className={currency === cur ? 'active' : ''} //Якщо валюта обрана - додаємо стилі що свідчать про це
          key={cur}> 
          {cur} 
        </li>
      ))}
    </ul>

    <h5><span>{direction}</span></h5>

    <input
      onChange={(e) => { 
        let nums = e.target.value.split(""); //Створюємо массив данних із інпута

        if (nums.includes(".")) { //Якщо є точка - обрізаємо массив
          let ind = nums.indexOf(".");
          let length = nums.length - ind;
             nums.splice(ind, length);
        }
        
        nums = nums.filter(item => { //Залищаємо тільки числові типи данних
          if(item === "0") {
            return true;
        }
        
        return +item;
        } ).map(item => +item);
        
        nums = +nums.join("");
       
        return onChangeValue(nums);
      }
    }
      value={value}
      type="text"
      placeholder={0}
      
     
    />
  <h3 className='buySell'>{buySell}</h3>
    <p className="buySellCurrency">{currencyIcon[0]}  {obj["USD"]} </p>
    <p className="buySellCurrency">{currencyIcon[1]} {obj["EUR"]}</p>
    <p className="buySellCurrency">{currencyIcon[2]} {obj["GBP"]}</p>

    
  </div>

  
);
