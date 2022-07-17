import { Component } from 'react';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();
    
    componentDidMount = () => {
        this.foo.bar = 0;
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
            error: false
        })
    }

    onCharListLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    

    renderItems = (arr) => {
        const items = arr.map(item => {
            const {thumbnail, name, id} = item;
            let imgStyle = {'objectFit': 'cover'}

            if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit': 'contain'}
            }



            return (
                <li className="char__item"
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}>
                    <img src={thumbnail} alt="abyss" style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    
    render() {
        const {charList, loading, error} = this.state;
        const loadingMessage = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const items = !(error || loading) ? this.renderItems(charList) : null;
        

        return (
            <div className="char__list">
                    {loadingMessage}
                    {errorMessage}
                    {items}
                    <button className="button button__main button__long">
                        <div className="inner">load more</div>
                    </button>
            </div>
        )
    }
}

export default CharList;