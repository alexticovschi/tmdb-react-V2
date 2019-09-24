import React from "react";

import Modal from "react-modal";

import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import "./banner.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "90%"
  }
};

const Banner = ({
  base_url,
  movie,
  trailers,
  openModal,
  modalIsOpen,
  closeModal
}) => {
  return (
    <section className="banner">
      <Fade delay={200}>
        <div className="banner__inner">
          <div className="banner__image">
            <img
              className="banner__custom-bg-poster"
              src={base_url + movie.backdrop_path}
              alt=""
            />
          </div>
          {trailers.length > 0 ? (
            <div onClick={openModal} className="banner__play-btn button-light">
              <i className="fas fa-play"></i>
            </div>
          ) : null}
        </div>
      </Fade>

      {trailers.length > 0 ? (
        <div className="banner__modal">
          {trailers.slice(0, 1).map(trailer => (
            <Modal
              key={trailer.key}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <Zoom delay={300}>
                <iframe
                  key={trailer.key}
                  className="banner__modal__iframe"
                  style={{ borderRadius: "6px", margin: "10px auto" }}
                  title="1"
                  allow="encrypted-media"
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                />
              </Zoom>
            </Modal>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Banner;
