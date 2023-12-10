import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';

class LinkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favLinks: [],
    };
  }

  handleRemove = (index) => {
    const updatedLinks = [...this.state.favLinks];
    updatedLinks.splice(index, 1);
    this.setState({ favLinks: updatedLinks });
  };

  handleSubmit = (favLink) => {
    this.setState((prevState) => ({
      favLinks: [...prevState.favLinks, favLink],
    }));
  };

  resetPage = () => {
    // Reset the page to its default state
    this.setState({ favLinks: [] });
  };

  render() {
    return (
      <div>
        <h1>My Favorite Links</h1>
        <p>Add a new link with a name and URL to the table! </p>

        {/* Pass favLinks state and removeLink function to the Table component */}
        <Table linkData={this.state.favLinks} removeLink={this.handleRemove} />

        {/* Render the Form component below the Table component and pass handleSubmit, clearTable, and resetPage */}
        <h1>Add New</h1>
        {/* Pass handleSubmit, clearTable, and resetPage functions as props to the Form component */}
        <Form onSubmit={this.handleSubmit} resetPage={this.resetPage} />
      </div>
    );
  }
}

export default LinkContainer;
