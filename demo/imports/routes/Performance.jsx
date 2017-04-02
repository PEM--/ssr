import React, { PropTypes as pt } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { pure, valueSet } from 'meteor/ssrwpo:ssr';
import perf from '/imports/ui/hoc/perf';

let Item = ({ idx }) => <li>{idx}</li>;
Item.propTypes = {
  idx: pt.number.isRequired,
};
Item = pure(Item);

const Performance = ({ perfItems, toggle }) => (
  <div>
    <Helmet><title>Performance</title></Helmet>
    <h2>Performance</h2>
    <p>Nb items: {perfItems} <button onClick={() => toggle(perfItems)}>Toggle</button></p>
    <ul>
      {Array.from(Array(perfItems).keys(), idx => <Item key={`item${idx}`} idx={idx} />)}
    </ul>
  </div>
);
Performance.propTypes = {
  perfItems: pt.number.isRequired,
  toggle: pt.func.isRequired,
};
export default connect(
  state => ({ perfItems: state.perfItems }),
  dispatch => ({ toggle: val => dispatch(valueSet('perfItems', val === 1000 ? 2000 : 1000)) }),
)(perf(Performance));
