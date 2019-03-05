export default class AuthorService {
    static callApi = async () => {
        return fetch('/mockdata.json')
            .then((response) => response.text())
            .then((responseData) => {
                return responseData;
            });
    }
}