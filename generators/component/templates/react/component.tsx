import { connect } from 'react-redux';
import { <%= name %> } from './<%= name %>';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const <%= name %> = connect(mapStateToProps, mapDispatchToProps)(
  <%= name %>
);
