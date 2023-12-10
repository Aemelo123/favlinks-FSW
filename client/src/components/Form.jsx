import React, { useState } from 'react';

function Form(props) {
  const [linkName, setLinkName] = useState('');
  const [linkURL, setLinkURL] = useState('');

  const handleNameChange = (event) => {
    setLinkName(event.target.value);
  };

  const handleURLChange = (event) => {
    setLinkURL(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newLink = { name: linkName, URL: linkURL };
    props.onSubmit(newLink);
    // Clear the input fields after submission
    setLinkName('');
    setLinkURL('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="linkName">Link Name:</label>
      <input
        type="text"
        id="linkName"
        name="linkName"
        value={linkName}
        onChange={handleNameChange}
      />
      <br />
      <br />
      <label htmlFor="linkURL">Link URL:</label>
      <input
        type="text"
        id="linkURL"
        name="linkURL"
        value={linkURL}
        onChange={handleURLChange}
      />
      <br />
      <br />
      <input type="submit" value="Submit" />
      <button type="button" onClick={props.resetPage}>
        Submit Form
      </button>
    </form>
  );
}

export default Form;
