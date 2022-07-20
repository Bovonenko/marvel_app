import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from "../singleComic/SingleComic";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// import decoration from '../../resources/img/vision.png';

const App = () => {
    // const [selectedChar, setChar] = useState(null);
    const [selectedComic, setComic] = useState(null);

    const onComicSelected = (id) => {
        setComic(id)
    }

    // const onCharSelected = (id) => {
    //     setChar(id)
    // }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <AppBanner/>
                <ComicsList onComicSelected={onComicSelected}/>
                <SingleComic selectedComic={selectedComic}/>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
            </main>
        </div>
    )
}

export default App;