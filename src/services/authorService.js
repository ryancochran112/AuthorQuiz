export default class AuthorService {
    static callApi = async () => {
        await fetch('/mockdata.json')
            .then((response) => response.text())
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}