import { test } from '@japa/runner';
import { greet } from '../src/index.js';
test.group('Test', () => {
  test('should return greeting with the provided name', ({ assert }) => {
    assert.equal(greet('John'), 'Hello, John!');
  });
});
