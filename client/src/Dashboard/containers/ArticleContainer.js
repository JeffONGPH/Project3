import {connect} from 'react-redux';
import Article from '../components/Article';

const mapStateToProps = state => {
  return {
    sourcesMap: state.sources
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);