import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { getStore, connect } from 'labrador-redux';
import Article from '../../components/article-grid-item/article-grid-item';
import { refresh } from '../../redux/topics.js';


const { array, func } = PropTypes;

class Recommandation extends Component {
  static propTypes = {
    topics: array
  };

  state = {
    layerLevel: 0
  };

  children() {
    let topics = this.props.topics || [];
    return {
      topics: topics.map((topic) => ({
        component: Article,
        key: topic.id,
        props: {
          ...topic
        }
      }))
    }
  }

  handleToggleLayer() {
    if (this.state.layerLevel == 0)
      this.setState({
        layerLevel: 1
      });
    else
      this.setState({
        layerLevel: 0
      });
  }

  refreshTrigger(e) {
    this.setState({
      layerLevel: 0
    });
    getStore().dispatch(refresh())
  }

  onLoad() {
    getStore().dispatch(refresh())
  }
}

export default connect((state) => ({topics: state.topics.list}))(Recommandation)
