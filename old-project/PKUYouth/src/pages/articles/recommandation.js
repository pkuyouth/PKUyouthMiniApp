import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { getStore } from 'labrador-redux';
import { connect } from 'labrador-redux';
import Article from '../../components/article-list-item/article-list-item';
import { refresh, FROM_RECOMMADATION } from '../../redux/articles.js';


const { array, func } = PropTypes;

class Recommandation extends Component {
    static propTypes = {
        articles: array
    };

    state = {
        layerLevel: 0
    };

    children() {
        let articles = this.props.articles || [];
        return {
            articles: articles.map((article) => ({
                component: Article,
                key: article.id,
                props: {
                    ...article
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
        getStore().dispatch(refresh(FROM_RECOMMADATION))
    }

    onLoad() {
        getStore().dispatch(refresh(FROM_RECOMMADATION))
    }
}

export default connect((state) => ({articles: state.articles.list[FROM_RECOMMADATION]}))(Recommandation)
