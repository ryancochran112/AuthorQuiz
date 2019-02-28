import AuthorService from '../../services/author.service';

describe("Author Service Tests", () => {
    let consoleSpy;
    const apiError = "error";
    
    it("Api Fail", async () => {
      // Arrange
      global.fetch = jest.fn(() => Promise.reject(apiError));
      consoleSpy = jest.spyOn(global.console, 'error');
  
      // Act
      await AuthorService.callApi();
  
      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(apiError);
    });
  
    it("Api Success", async () => {
      // Arrange
      const data = ['test 1', 'test 2'];
      global.fetch = jest.fn(() => Promise.resolve({ text: jest.fn(() => Promise.resolve(data)) }));
      consoleSpy = jest.spyOn(global.console, 'log');
  
      // Act
      await AuthorService.callApi();

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(data);
    });
  });