$(document).ready(function() {
    // Array of function scripts to load
    const functionScripts = [
        'js/functions/stateManager.js',
        'js/functions/startLongPolling.js',
        'js/functions/displayMessages.js',
        'js/functions/eventHandlers.js'
    ];

    // Function to load scripts dynamically
    function loadScripts(scripts, callback) {
        let index = 0;

        function loadNext() {
            if (index < scripts.length) {
                $.getScript(scripts[index])
                    .done(function() {
                        index++;
                        loadNext(); // Load the next script
                    })
                    .fail(function() {
                        console.error('Error loading ' + scripts[index]);
                    });
            } else {
                callback(); // All scripts loaded, execute callback
            }
        }

        loadNext();
    }

    // Load all function scripts
    loadScripts(functionScripts, function() {
        console.log('All scripts loaded successfully.');

        // Setup event handlers after all scripts are loaded
        setupEventHandlers();
    });
});
