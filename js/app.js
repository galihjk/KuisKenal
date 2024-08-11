const STARTING_COUNTDOWN = 60; // Waktu mulai permainan dalam detik
const EXTEND_COUNTDOWN = 90; // Waktu + perpanjangan untuk memulai permainan dalam detik
const NOTIFICATION_INTERVAL = 15; // Interval untuk mengirim notifikasi detik
const MINIMUM_PLAYER = 2; // jumlah pemain minimal


$(document).ready(function() {

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

    loadScripts(functionScripts, function() {
        console.log('All scripts loaded successfully.');
        setupEventHandlers(); // Setup event handlers setelah semua script termuat
    });
});
