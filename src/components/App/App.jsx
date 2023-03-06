import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { apiImages } from 'api/Api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Container } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    perPage: 12,
    arrayImg: [],
    shouModal: false,
    largeUrl: null,
    loader: false,
    shouBtn: false,
  };

  static propTypes = {
    query: PropTypes.string,
    page: PropTypes.number,
    perPage: PropTypes.bool,
    arrayImg: PropTypes.array,
    shouModal: PropTypes.bool,
    largeUrl: PropTypes.string,
    loader: PropTypes.bool,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, perPage, shouBtn, arrayImg } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      try {
        this.setState({
          loader: true,
        });
        const { hits, totalHits } = await apiImages(query, page, perPage);
        if (totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        } else {
          this.setState(({ arrayImg, shouBtn }) => ({
            arrayImg: [...prevState.arrayImg, ...hits],
            shouBtn: page < Math.ceil(totalHits / 12),
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({
          loader: false,
        });
        return;
      }
    }
  }

  toggleModal = () => {
    this.setState(({ shouModal }) => ({ shouModal: !shouModal }));
  };

  handleLargeImage = image => {
    this.setState({ largeUrl: image.largeImageURL, shouModal: true });
  };

  handleSubmit = ({ query }) => {
    this.setState({ query: query });
  };

  handleButtonLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { arrayImg, shouModal, largeUrl, loader, perPage, shouBtn } =
      this.state;
    return (
      <Container>
        <Searchbar submit={this.handleSubmit}></Searchbar>
        {arrayImg && (
          <ImageGallery
            images={arrayImg}
            сlick={this.handleLargeImage}
          ></ImageGallery>
        )}
        {shouBtn && (
          <Button onLoadMore={this.handleButtonLoadMore}>Load more</Button>
        )}
        {shouModal && (
          <Modal onClose={this.toggleModal} largeUrl={largeUrl}></Modal>
        )}
        {loader && <Loader></Loader>}
      </Container>
    );
  }
}
