export const fetchAuthors = () => async () => {
    return await fetch('../mockdata/mockdata.json')
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        })
        .catch((error) => console.error(error))
        .done();
}