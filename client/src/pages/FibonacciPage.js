import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FibonacciPage.css';

function FibonacciPage() {
  const [index, setIndex] = useState('');
  const [indicies, setIndicies] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [reRenderPage, setReRenderPage] = useState(true);

  function fetchIndicies() {
    axios
      .get('/api/indicies')
      .then((res) => {
        const indiciesTemp = res.data.reduce(
          (output, current) =>
            output.length > 0 ? [...output, current.number] : [current.number],
          []
        );
        setIndicies(indiciesTemp);
      })
      .catch((err) => console.log(`err: ${err}`));
  }

  function fetchValues() {
    axios
      .get('/api/values')
      .then((res) => setCalculatedValues(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (reRenderPage) {
      fetchIndicies();
      fetchValues();
      setReRenderPage(false);
    }
  }, [reRenderPage]);

  function submitFormHandler(e) {
    e.preventDefault();

    if (index.trim().length > 0) {
      const body = {
        index: parseInt(index),
      };
      axios
        .post('/api/indicies', body)
        .then((res) => {
          if (res.data.success) {
            setReRenderPage(true);
            setIndex('');
          } else {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <div className="header">Fibonacci Calculator 2.0</div>

      <form className="index__form" onSubmit={submitFormHandler}>
        <div className="form__control">
          <label>Enter your index:</label>
          <input type="number" value={index} onChange={(e) => setIndex(e.target.value)} />
        </div>
        <input type="submit" value="Submit" />
      </form>

      <div className="indicies">
        <h3>Indicies I have seen:</h3>
        <span>{indicies.join(', ')}</span>
      </div>

      <div className="calculated__values">
        <h3>Calculated values:</h3>
        <ul className="calculatedValues__list">
          {Object.keys(calculatedValues).map((item, index) => (
            <li key={index} className="">
              For index {item} | Calculated {calculatedValues[item]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FibonacciPage;
