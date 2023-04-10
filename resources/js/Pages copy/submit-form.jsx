import React, { useState } from 'react';
import axios from 'axios';

function MultiViewPage() {
  const [inputValue, setInputValue] = useState('');
  const [view, setView] = useState('view1');
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('/submit-form', {
      inputValue: inputValue
    })
    .then(response => {
      if (response.data.errors) {
        setErrors(response.data.errors);
      } else {
        setView('view2');
      }
    })
    .catch(error => console.log(error));
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      {view === 'view1' && (
        <form onSubmit={handleSubmit}>
          <label>
            Enter a value:
            <input type="text" value={inputValue} onChange={handleInputChange} />
          </label>
          {errors.inputValue && (
            <div className="alert alert-danger">{errors.inputValue[0]}</div>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
      {view === 'view2' && (
        <div>
          <h1>View 2</h1>
          <p>You entered: {inputValue}</p>
        </div>
      )}
    </div>
  );
}
