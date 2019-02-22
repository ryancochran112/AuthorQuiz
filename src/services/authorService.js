export default class AuthorService {
    static fetchAuthors = () => async () => {
        return await fetch('/mockdata.json')
            .then((response) => response.text())
            .then((responseData) => {
                return responseData;
            })
            .catch((error) => console.error(error))
            .done();
    }
}