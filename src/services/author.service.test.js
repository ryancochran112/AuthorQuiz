import AuthorService from './author.service';

describe("Author Service Tests", () => {
  it("Api Success", async () => {
    // Arrange
    const expectedData = ['test 1', 'test 2'];
    global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn(() => Promise.resolve(expectedData)) }));

    // Act
    const actualData = await AuthorService.callApi();

    // Assert
    expect(actualData).toEqual(expectedData);
  });
});