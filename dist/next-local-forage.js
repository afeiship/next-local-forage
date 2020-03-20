/*!
 * name: @feizheng/next-local-forage
 * description: LocalForage for next.
 * url: https://github.com/afeiship/next-local-forage
 * version: 1.0.0
 * date: 2020-03-20 17:23:11
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var localforage = global.localforage || require('localforage');

  var NxLocalForage = nx.declare('nx.LocalForage', {
    methods: {
      init: function(inOptions) {
        this.config(inOptions);
      },
      config: function(inOptions) {
        localforage.config(inOptions);
      },
      set: function(inKey, inValue) {
        return localforage.setItem(inKey, inValue);
      },
      sets: function(inObject) {
        var promises = [];
        nx.forIn(
          inObject,
          function(key, value) {
            promises.push(this.set(key, value));
          },
          this
        );
        return Promise.all(promises);
      },
      get: function(inKey) {
        return localforage.getItem(inKey);
      },
      gets: function() {
        var self = this;
        return new Promise(function(resolve, reject) {
          self.keys().then(function(keys) {
            var reslves = [];
            var rejects = [];
            keys.map(function(key) {
              self
                .get(key)
                .then(function(res) {
                  reslves.push(res);
                })
                .catch(function(err) {
                  rejects(err);
                });
            });

            reslves.length && resove(reslves);
            rejects.length && reject(rejects);
          });
        });
      },
      del: function(inKey) {
        return localforage.removeItem(inKey);
      },
      dels: function(inKeys) {
        var promises = inKeys.map(function(key) {
          return this.del(key);
        }, this);
        return Promise.all(promises);
      },
      clear: function() {
        return localforage.clear();
      },
      keys: function() {
        return localforage.keys();
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxLocalForage;
  }
})();

//# sourceMappingURL=next-local-forage.js.map
