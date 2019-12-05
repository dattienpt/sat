import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import Main from "../layouts/main.jsx";

function Page03({ location }) {
  return (
    <Main location={location}>
      <div>Route Component: Page03</div>
    </Main>
  );
}

Page03.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Page03);
