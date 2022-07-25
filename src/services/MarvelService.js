import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e12efca494812a1bf756cd86221addbd';

    const _baseOffset = 210;
    const _comicsOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    
    const getAllComics = async (offset = _comicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }
    
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name.length > 22 ? char.name.slice(0, 22) + '...' : char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Text is not avalible',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title.length > 22 ? comic.title.slice(0, 22) + '...' : comic.title,
            description: comic.description ? comic.description : 'Description is not avalible',
            pageCount: comic.pageCount,
            language: comic.textObjects.language || 'en-us',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price === 0 ? 'Not available' : comic.prices[0].price + '$'
        }
    }

    return {loading, error, getAllCharacters, getCharacterByName, getCharacter, clearError, getAllComics, getComic}
}

export default useMarvelService;