import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();
    
    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }
    
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(prevList => [...prevList, ...newCharList]);
        setLoading(loading => false);
        setError(error => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(prevOffset => prevOffset + 9);
        setCharEnded(charEnded => ended);
        
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const {thumbnail, name, id} = item;
            let imgStyle = {'objectFit': 'cover'}

            if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit': 'contain'}
            }

            return (
                <li className="char__item"
                    key={id}
                    ref={el => itemRefs.current[i] = el}
                    tabIndex={0}
                    onClick={() => {
                        props.onCharSelected(id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(id);
                            focusOnItem(i);
                        }
                    }}
                    >
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

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ? items : null;

    return (
        <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList;
