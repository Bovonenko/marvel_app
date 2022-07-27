import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState} from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';

const setContent = (process, Component, char) => {
    switch (process) {
        case 'waiting': 
            return;
        case 'loading': 
            return;
        case 'confirmed':
            return char.length > 0 ? 
            <Component char={char}/> : <div className="char__search-error">
                                            The character was not found. Check the name and try again
                                        </div> 
        case 'error':
            return <div className='char__search-critical-error'><ErrorMessage/></div>;
        default: 
            throw new Error('Unexpected error');
    }
}

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {error, loading, getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({charName}) => {
                    updateChar(charName)
                }}>
                <Form>
                    <label htmlFor='charName' className="char__search-label">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName"
                            type="text"
                            name="charName"
                            placeholder="Enter name" />
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={process === 'loading'}>
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <FormikErrorMessage className='char__search-error' name='charName' component='div' />
                </Form>
            </Formik>
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({char}) => {
    return (
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
    )
}
export default CharSearchForm;