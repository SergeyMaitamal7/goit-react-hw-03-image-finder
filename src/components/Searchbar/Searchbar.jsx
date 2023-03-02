import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { BsSearch} from 'react-icons/bs';
import {
  SearchbarForm,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    query: PropTypes.string,
  };

  handleClickChange = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value.toLowerCase() });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    if (this.state.query.trim()  === '') {
      Notify.failure(
        'The search string cannot be empty. Please specify your search query.'
      );
      return;
    }
    this.props.submit(this.state);
    this.resetForm();
  };

  resetForm = e => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarForm>
        <SearchForm onSubmit={this.handleSubmitForm}>
          <SearchFormButton type="submit"> <BsSearch size="2rem" color="black"/>
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>
          <Input
            onChange={this.handleClickChange}
            name="input"
            value={this.state.query}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarForm>
    );
  }
}
