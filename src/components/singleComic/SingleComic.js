import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import './singleComic.scss';

const SingleComic = (props) => {

    const [singleComic, setSingleComic] = useState({});
    const {error, loading, getComic} = useMarvelService();

    useEffect(() => {
        updateSingleComic();
    }, [props.selectedComic])

    const updateSingleComic = () => {
        const {selectedComic} = props;
        if (!selectedComic) {
            return;
        }
        getComic(selectedComic)
            .then(onSingleComicLoaded)
    }

    const onSingleComicLoaded = (comic) => {
        setSingleComic(comic);
    }
    // console.log(singleComic);

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const items = !(error || loading) ? <View singleComic={singleComic}/> : null;
    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {items}
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

const View = ({singleComic}) => {
    const {thumbnail, title, description, pageCount, language, price} = singleComic;
    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComic;