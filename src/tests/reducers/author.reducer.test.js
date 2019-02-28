// Mock Data
import { AUTHORS } from '../../mockdata/mockdata';
// Actions
import { ADD_AUTHOR} from '../../actions/authors.action';
// Reducers
import authorsReducer from '../../reducers/author.reducer';

  describe('Reducers', () => {
    // Arrange
    const state = {
      authors: AUTHORS,
      turnData: {
        author: AUTHORS[0],
        books: AUTHORS[0].books
      },
      highlight: 'correct'
    };

    it('should return the initial state', () => {
      // Assert
      expect(authorsReducer(undefined, {}).authors).toEqual(AUTHORS);
      expect(authorsReducer(undefined, {}).highlight).toEqual('');
    });

    it('Adding an Author Reducer test', () => {
      // Act
      var result = authorsReducer(state, {
        type: ADD_AUTHOR,
        payload: { name: 'Ryan', imageUrl: '/testimage.jpg', books: ['James is cool!'] }
      }).authors;
      // Assert
      expect(result.length).toBe(AUTHORS.length + 1);
      expect(result.filter(author => author.name === 'Ryan' && 
      author.imageUrl === '/testimage.jpg' &&
      author.books[0] === 'James is cool!').length).toBe(1);
    });
  });