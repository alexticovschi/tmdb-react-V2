import React, { Component } from 'react';
import SearchBoxWithSuggestions from '../../components/SearchBoxWithSuggestionsPerson/SearchBoxWithSuggestions';
import ProfileInfo from '../../components/PersonComponents/ProfileInfo/ProfileInfo';
import Biography from '../../components/PersonComponents/Biography/Biography';
import TaggedImages from '../../components/PersonComponents/TaggedImages/TaggedImages';
import Filmography from '../../components/PersonComponents/Filmography/Filmography';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { APIKEY } from '../../config';
import './person.scss';

class Person extends Component {
  state = {
    loading: true,
    personProfileInfo: [],
    personFilmographyData: [],
    personTaggedImages: []
  };

  componentDidMount() {
    const { person_id } = this.props.match.params;
    this.getPersonProfileInfo(person_id);
    this.getPersonFilmographyData(person_id);
    this.getPersonTaggedImages(person_id);
  }

  getPersonProfileInfo = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}?api_key=${APIKEY}&language=en-US`
    );
    const personProfileInfo = await resp.json();
    this.setState({ personProfileInfo });
    setTimeout(() => this.setState({ loading: false }), 150);
  };

  getPersonFilmographyData = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}/movie_credits?api_key=${APIKEY}&language=en-US`
    );
    const personFilmographyData = await resp.json();
    this.setState({ personFilmographyData: personFilmographyData.cast });
  };

  getPersonTaggedImages = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}/tagged_images?api_key=${APIKEY}&language=en-US&page=1`
    );
    const personTaggedImages = await resp.json();
    this.setState({ personTaggedImages: personTaggedImages.results });
  };

  getMovieById = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`
    );
    const movie = await resp.json();
    this.setState({ movie });
  };

  render() {
    const base_url = 'https://image.tmdb.org/t/p/w500';
    const base_url2 = 'https://image.tmdb.org/t/p/original';

    const {
      personProfileInfo,
      personTaggedImages,
      personFilmographyData
    } = this.state;
    console.log(personFilmographyData);
    return (
      <div className='person-container'>
        {this.state.loading ? (
          <div className='loader-container'>
            <Loader type='Oval' color='#fff' width={60} height={60} />
          </div>
        ) : (
          <>
            <SearchBoxWithSuggestions />

            <ProfileInfo person={personProfileInfo} base_url={base_url} />

            {personProfileInfo.biography ? (
              <Biography biography={personProfileInfo.biography} />
            ) : null}

            {personTaggedImages.length ? (
              <TaggedImages
                taggedImages={personTaggedImages}
                base_url={base_url}
                base_url2={base_url2}
              />
            ) : null}

            {personFilmographyData.length > 0 ? (
              <Filmography
                title='Filmography'
                getMovieById={this.getMovieById}
                movieList={personFilmographyData}
              />
            ) : null}
          </>
        )}
      </div>
    );
  }
}

export default Person;
