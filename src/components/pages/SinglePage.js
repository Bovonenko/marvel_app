import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';

import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getCharacter, getComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic': {
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            }
            case 'character': {
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            }
        }
    }

    const onDataLoaded = (item) => {
        setData(item);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;