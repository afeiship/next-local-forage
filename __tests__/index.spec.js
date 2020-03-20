(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxLocalForage = require('../src/next-local-forage');

  describe('NxLocalForage.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
