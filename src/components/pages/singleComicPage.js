import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();

    const [singleComic, setSingleComic] = useState(null);
    const {error, loading, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateSingleComic();
    }, [comicId])

    const updateSingleComic = () => {
        clearError();
        getComic(comicId)
            .then(onSingleComicLoaded)
    }

    const onSingleComicLoaded = (comic) => {
        setSingleComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const items = !(error || loading || !singleComic) ? <View singleComic={singleComic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {items}
        </>
    )
}

const View = ({singleComic}) => {
    const {thumbnail, title, description, pageCount, language, price} = singleComic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;