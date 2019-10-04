import React from "react";
import ImageZoom from "react-medium-image-zoom";
import Fade from "react-reveal/Fade";

import "./taggedImages.scss";

const TaggedImages = ({ taggedImages, base_url, base_url2 }) => {
  return (
    <section className="tagged-images">
      <div className="group">
        <div className="group-item line" />
        <Fade>
          <h1 className="title group-item text">Tagged Images</h1>
        </Fade>
        <div className="group-item line" />
      </div>
      <>
        <div className="masonry">
          {taggedImages.map((img, i) => (
            <div className="masonry__item" key={i}>
              <Fade delay={10 * i}>
                <ImageZoom
                  image={{
                    src: `${base_url + img.file_path}`,
                    alt: "actor profile image small",
                    className: "masonry__item--img"
                  }}
                  zoomImage={{
                    src: `${base_url2 + img.file_path}`,
                    alt: "actor profile image original"
                  }}
                />
              </Fade>
              <div className="text-content">
                <div className="title">
                  {img.media.original_title || img.media.original_name}(
                  {img.media.release_date
                    ? img.media.release_date.substr(0, 4)
                    : null || img.media.first_air_date
                    ? img.media.first_air_date.substr(0, 4)
                    : null}
                  )
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </section>
  );
};

export default TaggedImages;
