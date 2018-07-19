import { shuffle, sample } from 'underscore';

export function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c) {
        return p.concat(c.books);
    }, [])
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
                author.books.some((title) => 
                title === answer))
    }
}