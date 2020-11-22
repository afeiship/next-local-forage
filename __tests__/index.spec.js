(function() {
  const NxLocalForage = require('../src');

  describe('NxLocalForage.methods', function() {
    test('init', function() {
      const data = { key: 1, value: 2 };
      expect(!!data).toBe(true);
    });
  });
})();
