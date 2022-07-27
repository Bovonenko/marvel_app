import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting': 
            return <Spinner/>;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected error');
    }
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicEnded, setComicEnded] = useState(false);
    
    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComics(offset, true);
    }, [])

    const updateComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
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
                    tabIndex={0}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
    
        return (
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }
    
    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comics), newComicsLoading)}
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