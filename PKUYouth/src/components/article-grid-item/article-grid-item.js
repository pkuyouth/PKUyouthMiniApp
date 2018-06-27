/**
 * Created by 兰兆千 on 2017/11/27.
 */
import { Component, PropTypes } from 'labrador-immutable';

const { number, string } = PropTypes;

class ArticleGrid extends Component {
    static propTypes = {
        id: number,
        title: string,
        content: string,
        navurl: string,
        image: string
    };

    constructor(props) {
        super(props);
    }
}

export default ArticleGrid;
