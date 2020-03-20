(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var localforage = global.localforage || require('localforage');

  var NxLocalForage = nx.declare('nx.LocalForage', {
    methods: {
      init: function(inOptions) {
        this.options = inOptions;
        this.store = localforage.createInstance(this.options);
      },
      config: function(inOptions) {
        nx.mix(this.options, inOptions);
        this.store.config(this.options);
      },
      destroy: function() {
        return localforage.createInstance(this.options);
      },
      set: function(inKey, inValue) {
        return this.store.setItem(inKey, inValue);
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
        return this.store.getItem(inKey);
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
        return this.store.removeItem(inKey);
      },
      dels: function(inKeys) {
        var promises = inKeys.map(function(key) {
          return this.del(key);
        }, this);
        return Promise.all(promises);
      },
      clear: function() {
        return this.store.clear();
      },
      keys: function() {
        return this.store.keys();
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxLocalForage;
  }
})();
