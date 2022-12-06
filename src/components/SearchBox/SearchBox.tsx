import React from "react";
import { connect } from "react-redux";
import { applySearch, fetchMovies } from "../../actions";
import { TextField } from "@material-ui/core";
import "./SearchBox.css";

interface ISearxchBoxProps {
  searchTerm: string;
  applySearch: any;
  fetchMovies: any;
}

class SearchBox extends React.Component<ISearxchBoxProps> {
  inputTimeoutId: any = 0;

  onChange = (e: any) => {
    this.props.applySearch(e.target.value);
    clearTimeout(this.inputTimeoutId);
    this.inputTimeoutId = setTimeout(() => {
      this.props.fetchMovies();
    }, 500);
  };

  render() {
    return (
      <div className="searchBoxContainer">
        <div className="applicationNameContainer">
          <h2>
            WOOKIE
            <br />
            MOVIES
          </h2>
        </div>
        <div className="inputContainer">
          <TextField
            value={this.props.searchTerm}
            onChange={this.onChange}
            style={{ width: "300px" }}
            label="Search"
          />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state: any) => {
  return { searchTerm: state.searchTerm };
};

export default connect(mapStatesToProps, { applySearch, fetchMovies })(
  SearchBox
);
