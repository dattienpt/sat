import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import Main from '../layouts/basicLayout/main'

function Page02({ location }) {
  return (
    <Main location={location}>
      <div>Route Component: Page02</div>
    </Main>
  );
}

Page02.propTypes = {
  location: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Page02);
