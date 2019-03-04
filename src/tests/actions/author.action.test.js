// Redux
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
const mockStore = configureStore([thunk]);
// Actions
import { callApi } from '../../actions/author.action';

describe('Actions', () => {
    it('Call Api Action Success', async () => {
        // Arrange
        const data = ['test 1', 'test 2'];
        global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn(() => Promise.resolve(data)) }));
        const store = mockStore();
        // Act
        await store.dispatch(callApi());
        // Assert
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: "CALL_API_SUCCESS", payload: data });
    });
    it('Call Api Action Fail', async () => {
        // Arrange
        const apiError = "error";
        global.fetch = jest.fn(() => Promise.reject(apiError));
        const store = mockStore();
        // Act
        await store.dispatch(callApi());
        // Assert
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: "CALL_API_FAIL", payload: apiError });
    });
});