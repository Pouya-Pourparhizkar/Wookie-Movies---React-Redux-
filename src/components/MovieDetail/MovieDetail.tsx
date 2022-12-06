import { useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import { selectMovie } from "../../actions";
import Rating from "@material-ui/lab/Rating";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import "./MovieDetail.css";

const MovieDetail = (props: any) => {
  const currentComponentRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleEscape = (e: any) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleClickOutside = (e: any) => {
    if (!currentComponentRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeModal = () => {
    props.selectMovie(null);
  };

  const modalContainer = document.querySelector("#modal");
  return modalContainer
    ? ReactDom.createPortal(
        <div className="movieDetailContainer" ref={currentComponentRef}>
          <div className="detailContainer">
            <div className="imageContainer">
              <img
                className="poster"
                alt={props.selectedMovie.title}
                src={props.selectedMovie.poster}
              />
            </div>
            <div className="movieInformationContainer">
              <div>
                <div className="starRateContainer">
                  <Rating
                    name="disabled"
                    disabled
                    value={props.selectedMovie.imdb_rating / 2}
                  />
                </div>
                <div>
                  <div className="titleContainer">
                    {props.selectedMovie.title}
                  </div>
                  &nbsp;
                  <div className="ratingContainer">
                    ({props.selectedMovie.imdb_rating}/10)
                  </div>
                </div>
              </div>
              <div className="directorContainer">
                {new Date(props.selectedMovie.released_on).getFullYear()} |{" "}
                {props.selectedMovie.length} | {props.selectedMovie.director}
              </div>
              <div className="castsContainer">
                <b>Cast: {props.selectedMovie.cast.join(", ")}</b>
              </div>
              <div className="overViewContainer">
                {props.selectedMovie.overview}
              </div>
            </div>
          </div>
          <div className="closeButtonContainer">
            <HighlightOffTwoToneIcon onClick={closeModal} />
          </div>
        </div>,
        modalContainer
      )
    : null;
};

const mapStatesToProps = (state: any) => {
  return { selectedMovie: state.movies.selectedMovie };
};

export default connect(mapStatesToProps, { selectMovie })(MovieDetail);
