import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = (props) => {
    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicEnded, setComicEnded] = useState(false);
    
    const {getAllComics, error, loading} = useMarvelService();

    useEffect(() => {
        updateComics(offset, true);
    }, [])

    const updateComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComics(prevComics => [...prevComics, ...newComicsList]);
        setOffset(offset => offset + 8);
        setNewComicsLoading(false);
        setComicEnded(ended);
    }

    function renderItems(comics) {
        const elements = comics.map((comic, i) => {
            const {title, id, thumbnail, price} = comic;
            return (
                <li 
                    key={i} 
                    className="comics__item"
                    tabIndex={0}
                    onClick={() => props.onComicSelected(id)}>
                    <a href="#">
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </a>
                </li>
            )
        })
    
        return (
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }

    const items = renderItems(comics);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button  
                disabled={newComicsLoading}
                style={{'display': comicEnded ? 'none' : 'block'}}
                onClick={() => updateComics(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}



export default ComicsList;