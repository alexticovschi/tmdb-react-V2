import React, { Component } from "react";
import ActorFilmographyList from "../../components/ActorFilmographyList/ActorFilmographyList";
import { Link } from 'react-router-dom';
import ShowMore from 'react-show-more';
import ImageZoom from 'react-medium-image-zoom';
import Loader from '../../components/Loader/Loader';

import "./ActorProfileInfo.css";

class ActorProfileInfo extends Component {
    state = {
        actorProfileInfo: [],
        actorFilmographyData: [],
        actorTaggedImages: []  
    };

    componentDidMount() {
        const { actor_id } = this.props.match.params;
        this.getActorProfileInfo(actor_id);
        this.getActorFilmographyData(actor_id);
        this.getActorTaggedImages(actor_id);
    }

    getActorProfileInfo = async (ID) => {
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(
        `https://api.themoviedb.org/3/person/${ID}?api_key=${APIKEY}&language=en-US`
        );

        const actorProfileInfo = await resp.json();
        this.setState({ actorProfileInfo });
        // console.log("[ACTOR PROFILE]", actorProfileInfo);
    };

    getActorFilmographyData = async (ID) => {
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(
        `https://api.themoviedb.org/3/person/${ID}/combined_credits?api_key=${APIKEY}&language=en-US`
        );

        const actorFilmographyData = await resp.json();
        const actorFilmography = actorFilmographyData.cast.filter((movie) => movie.media_type !== "tv");
        // console.log('[actorFilmography]',actorFilmographyData);
        this.setState({ actorFilmographyData: actorFilmography });
    };

    getActorTaggedImages = async (ID) => {
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(
        `https://api.themoviedb.org/3/person/${ID}/tagged_images?api_key=${APIKEY}&language=en-US&page=1`
        );

        const actorTaggedImages = await resp.json();
        this.setState({ actorTaggedImages: actorTaggedImages.results });
        console.log(actorTaggedImages)
    };

    render() {
        const base_url = "https://image.tmdb.org/t/p/w500";
        const base_url2 = 'https://image.tmdb.org/t/p/original';

        const actor = this.state.actorProfileInfo;
        const filmography = this.state.actorFilmographyData;
        console.log(this.state)
        return (
        <div>
            <div className="container" style={{ marginTop: "56px" }}>
                <div className="row-actor-profile-info">
                    <div className="side">
                        <img
                            className="actor-profile-img"
                            src={
                            actor.profile_path === null
                                ? "https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg"
                                : base_url + actor.profile_path
                            }
                            alt={"img card"}
                        />
                    </div>
                    <div className="main">
                        <div className="inner-main">
                            <h1 className="actor-nm">{actor.name}</h1>

                            {/* <hr className="separator"/> */}

                            <div className="bio-content">
                                <div className="actor-bio-text">
                                    <h4 style={{paddingTop: "12px", marginBottom: "6px"}}>Biography</h4>

                                    <ShowMore
                                    lines={3}
                                    more='Show more'
                                    less='Show less'
                                    anchorClass='actor-biography-anchor'
                                    >
                                    {actor.biography}
                                    </ShowMore>
                                </div>

                                <div>
                                    <h4>
                                    Known For: <span>{actor.known_for_department}</span>
                                    </h4>
                                    <h4>
                                    Gender: <span>{actor.gender === 1 ? "Female" : "Male"}</span>
                                    </h4>
                                    <h4>
                                    Birthday: <span>{actor.birthday}</span>
                                    </h4>
                                    <h4>
                                    Place of Birth: <span>{actor.place_of_birth}</span>
                                    </h4>
                                    {actor.homepage !== null ?
                                    <h4>
                                        Official Site: <span><a href={actor.homepage} >{actor.homepage}</a></span>
                                    </h4>
                                    : null}
                                </div>
                            </div>
                        </div>
                            
                        <div className="actor-profile-info-btns">
                            <button
                            className="bio-btn"
                            onClick={() => this.props.history.goBack()}
                            >
                            Back To Movie Info
                            </button>
                            <Link 
                            to={`/cast/${actor.id}/images/profiles`}
                            className="bio-btn"
                            >
                            Images
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div>
                    {this.state.actorTaggedImages.length > 0 ?
                    <section className="tagged-images">
                        <div className="masonry">
                            {this.state.actorTaggedImages.map((img, i) => (
                            <div className="item" key={i}>
                                <ImageZoom
                                image={{
                                    src: `${base_url + img.file_path}`,
                                    alt: 'actor profile image small',
                                }}
                                zoomImage={{
                                    src: `${base_url2 + img.file_path}`,
                                    alt: 'actor profile image original'
                                }}
                                />    
                                <div className="text-content">
                                <div className="title">
                                    {img.media.original_title || img.media.original_name} 
                                    ({
                                    img.media.release_date ? img.media.release_date.substr(0,4) : null 
                                        || 
                                    img.media.first_air_date ? img.media.first_air_date.substr(0,4) : null
                                    })
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </section>
                    : null}
                </div>

                <section className="container filmography-profile-info">            
                    {filmography.length && filmography.length > 0 ? (
                    <div className="similar_movies">
                        <h1 className="title filmography">Filmography</h1>
                        <hr className="separator"/>
                        <ActorFilmographyList
                        movieList={filmography}
                        />
                    </div>
                    ) : null}
                </section>
            </div>
            
            <Loader/>
        </div>
        );
    }
}

export default ActorProfileInfo;
