let botToken = '';
let botUsername = '';
let isRunning = false;
let logMessages = [];
let groups = {};
let runningTelegramApiLongPolling = null;
const MAX_LOG_LINES = 200;
const START_COUNTDOWN = 10;
const EXTEND_COUNTDOWN = 90;
const NOTIFICATION_INTERVAL = 15;
const MIN_PLAYERS = 2;

$(document).ready(function() {
    $('#start-button').click(sys_startBot);
    $('#stop-button').click(sys_stopBot);

    last_token = localStorage.getItem('lastBotToken');
    if(last_token){
        $('#bot-token').val(last_token);
    }
});