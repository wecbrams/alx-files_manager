const assert = require('assert');
const DBClient = require('../utils/db'); // Adjust the path to the DBClient file accordingly

describe('DBClient', function() {
  let dbClient;

  before(function() {
    dbClient = new DBClient();
  });

  after(async function() {
    await dbClient.client.close();
  });

  describe('isAlive', function() {
    it('should return true when the client is connected', function() {
      assert.strictEqual(dbClient.isAlive(), true);
    });

    it('should return false when the client is not connected', async function() {
      await dbClient.client.close();
      assert.strictEqual(dbClient.isAlive(), false);
    });
  });

  describe('nbUsers', function() {
    it('should return the number of users in the "users" collection', async function() {
      const numUsers = await dbClient.nbUsers();
      assert.ok(Number.isInteger(numUsers) && numUsers >= 0);
    });
  });

  describe('nbFiles', function() {
    it('should return the number of files in the "files" collection', async function() {
      const numFiles = await dbClient.nbFiles();
      assert.ok(Number.isInteger(numFiles) && numFiles >= 0);
    });
  });
});

