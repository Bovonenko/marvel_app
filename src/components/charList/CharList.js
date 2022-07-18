import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1541,
        charEnded: false
    }

    marvelService = new MarvelService();
    
    componentDidMount = () => {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onSelectedItem = (e) => {
        // console.log(e.target);
        if (this.myRef) {
            console.log(this.myRef);
        }
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        // this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        // this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItems = (arr) => {
        const items = arr.map((item, i) => {
            const {thumbnail, name, id} = item;
            let imgStyle = {'objectFit': 'cover'}

            if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit': 'contain'}
            }



            return (
                <li className="char__item"
                    key={id}
                    ref={this.setRef}
                    tabIndex={0}
                    onClick={() => {
                        this.props.onCharSelected(id);
                        this.focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onCharSelected(id);
                            this.focusOnItem(i);
                        }
                    }}
                    >
                    <img src={thumbnail} alt="abyss" style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid" onClick={(e) => this.onSelectedItem(e)}>
                {items}
            </ul>
        )
    }

    
    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        const loadingMessage = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const items = !(error || loading) ? this.renderItems(charList) : null;
        

        return (
            <div className="char__list">
                    {loadingMessage}
                    {errorMessage}
                    {items}
                    <button 
                        className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                        <div className="inner">load more</div>
                    </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList;
