import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';

import AppBanner from "../appBanner/AppBanner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {error, loading, getCharacter, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic': {
                getComic(id).then(onDataLoaded);
                break;
            }
            case 'character': {
                getCharacter(id).then(onDataLoaded);
                break;
            }
        }
    }

    const onDataLoaded = (item) => {
        setData(item);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content  = !(error || loading || !data) ? <Component data={data}/> : null;


    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;