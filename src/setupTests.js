import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

console.log('setup my tests fool!');

// init local storage
class LocalStorageMock {
    constructor() { this.store = {}; }
    clear = () => this.store = {};
    getItem = (key) => this.store[key] || null;
    setItem = (key, value) => this.store[key] = value.toString();
    removeItem = (key) => delete this.store[key];
};
global.localStorage = new LocalStorageMock;

// Reference:  https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests