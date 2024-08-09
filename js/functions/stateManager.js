const stateManager = (function() {
    let state = {};

    return {
        set: function(key, value) {
            state[key] = value;
        },
        get: function(key) {
            return state[key];
        }
    };
})();
