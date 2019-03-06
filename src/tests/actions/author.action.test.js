// Redux
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);
// Actions
import { loadAuthors } from '../../actions/author.action';

describe('Actions', () => {
    it('Load Authors Success', async () => {
        // Arrange
        const data = JSON.stringify(["test 1", "test 2"]);
        global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn(() => Promise.resolve(data)) }));
        const store = mockStore();
        // Act
        await store.dispatch(loadAuthors());
        // Assert
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: "LOAD_AUTHORS_SUCCESS", payload: JSON.parse(data) });
    });
    it('Load Authors Fail', async () => {
        // Arrange
        const apiError = "error";
        global.fetch = jest.fn(() => Promise.reject(apiError));
        const store = mockStore();
        // Act
        await store.dispatch(loadAuthors());
        // Assert
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: "LOAD_AUTHORS_FAIL", payload: apiError });
    });
});