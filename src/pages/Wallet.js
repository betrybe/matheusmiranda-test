/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/jsx-max-depth */

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

import trash from '../assets/trash.png';

import '../styles/wallet.css';

import getConvervetedValue from '../helpers/convertValue';
import getConvertedCurrencyName from '../helpers/convertCurrencyName';

function Wallet() {
  const [currencies, setCurrencies] = useState([]);
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [payment, setPayment] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [description, setDescription] = useState('');
  const [tableValues, setTableValues] = useState([]);

  useEffect(() => {
    async function apiCall() {
      await fetch('https://economia.awesomeapi.com.br/json/all').then((response) => {
        if (response.status === 200 && response.status < 300) {
          const data = response.json();
          return data;
        }
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
      })
        .then((data) => {
          console.log(Object.values(data));
          setCurrencies(Object.values(data));
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
    apiCall();
  }, []);

  const getDataFromApi = (currencyReceived) => {
    const data = currencies.filter(((item) => item.code === currencyReceived));
    return data;
  };

  const handleAddExpenses = (event) => {
    event.preventDefault();

    const receivedData = getDataFromApi(currency);

    const item = {
      id: Math.random(),
      description,
      tag,
      sigla: currencies.code,
      payment,
      value,
      currency: getConvertedCurrencyName(receivedData[0].name, true),
      ask: receivedData[0].ask,
      convertedValue: getConvervetedValue(value, receivedData[0].ask),
      exchangedCurrency: getConvertedCurrencyName(receivedData[0].name, false),
    };

    setTableValues((prevState) => ([...prevState, item]));
  };

  const handleDeleteItem = (index) => {
    setTableValues((prevState) => prevState.filter((item, id) => id !== index));
  };

  return (
    <>
      <Header />

      <section className="formwallet-wrapper">
        <form className="formwallet">
          <label htmlFor="value">
            Valor:
            <input type="number" value={ value } name="value" onChange={ (event) => setValue(event.target.value) } />
          </label>

          <label htmlFor="currencies">
            Moeda:
            <select name="currencies" onChange={ (event) => setCurrency(event.target.value) }>
              {currencies.filter((currencie) => currencie.codein !== 'BRLT').map((filteredCurrencie) => (

                <option key={ Object.values(filteredCurrencie) } value={ filteredCurrencie.code }>{filteredCurrencie.code}</option>
              ))}

            </select>

          </label>

          <label htmlFor="payment">
            Método de pagamento:
            <select name="payment" onChange={ (event) => setPayment(event.target.value) }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de debito">Cartão de debito</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select value={ tag } name="tag" onChange={ (event) => setTag(event.target.value) }>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input type="text" value={ description } name="description" onChange={ (event) => setDescription(event.target.value) } />
          </label>

          <button type="button" onClick={ handleAddExpenses } className="btn btn-primary">Adicionar Dispesa</button>
        </form>
      </section>

      <section>
        <div className="table-responsive-md">
          <table className="table table-hover">

            <thead className="thead-dark">
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Tag</th>
                <th scope="col">Método de pagamento</th>
                <th scope="col">Valor</th>
                <th scope="col">Moeda</th>
                <th scope="col">Câmbio utilizado</th>
                <th scope="col">Valor convertido</th>
                <th scope="col">Moeda de conversão</th>
                <th scope="col">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>

              {tableValues.length > 0 && (
                tableValues.map((tableItem, index) => (
                  <tr key={ tableItem.id }>
                    <td>{tableItem.description}</td>
                    <td>{tableItem.tag}</td>
                    <td>{tableItem.payment}</td>
                    <td>{new Intl.NumberFormat().format(tableItem.value)}</td>
                    <td>{tableItem.currency}</td>
                    <td>{tableItem.ask}</td>
                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tableItem.convertedValue)}</td>
                    <td>{tableItem.exchangedCurrency}</td>
                    <td>
                      <button type="button" data-testid="delete-btn" onClick={ () => handleDeleteItem(index) }>
                        <div className="delete-btn_wrapper">
                          <img
                            className="delete-btn"
                            src={ trash }
                            alt="delete-icon"
                          />
                        </div>
                      </button>
                    </td>

                  </tr>
                ))

              )}

            </tbody>

          </table>
        </div>
      </section>

    </>
  );
}

export default Wallet;
