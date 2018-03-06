import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';

describe('SOMETHING to Testing', () => {
  describe('#SOMETHING to Testing', () => {
    it('Describe something', () => {
      // Arrange
      const initialState = {};

      deepFreeze(initialState);

      const action = {};

      // Act
      const finalState =
        // Assert
      expect(finalState).not.to.be.undefined;
      expect(finalState.METHOD).to.be.true;
      expect(finalState.METHOD).to.be.equal('SOMETHING');
      expect(finalState.METHOD).to.be.equal('SOMETHING');
    });
  });
});
