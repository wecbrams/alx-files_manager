const assert = require('assert');
const RedisClient = require('../utils/redis'); // Adjust the path to the RedisClient file accordingly

describe('RedisClient', function() {
  let redisClient;

  before(function() {
    redisClient = new RedisClient();
  });

  after(async function() {
    await redisClient.client.quit();
  });

  describe('isAlive', function() {
    it('should return true when the client is connected', function() {
      assert.strictEqual(redisClient.isAlive(), true);
    });

    it('should return false when the client is not connected', async function() {
      await redisClient.client.quit();
      assert.strictEqual(redisClient.isAlive(), false);
    });
  });

  describe('get and set', function() {
    it('should set a key-value pair and then retrieve its value', async function() {
      const key = 'test-key';
      const value = 'test-value';
      await redisClient.set(key, value, 60); // Setting expiration time to 60 seconds
      const retrievedValue = await redisClient.get(key);
      assert.strictEqual(retrievedValue, value);
    });

    it('should return null for a non-existent key', async function() {
      const nonExistentKey = 'non-existent-key';
      const retrievedValue = await redisClient.get(nonExistentKey);
      assert.strictEqual(retrievedValue, null);
    });
  });

  describe('del', function() {
    it('should delete a key-value pair', async function() {
      const key = 'key-to-delete';
      const value = 'value-to-delete';
      await redisClient.set(key, value, 60);
      await redisClient.del(key);
      const retrievedValue = await redisClient.get(key);
      assert.strictEqual(retrievedValue, null);
    });

    it('should not throw an error for a non-existent key', async function() {
      const nonExistentKey = 'non-existent-key';
      await redisClient.del(nonExistentKey);
      // No assertion needed as the absence of an error is the success condition
    });
  });
});

