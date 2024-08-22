var botToken = '';
var botUsername = '';
var isRunning = false;
var logMessages = [];
var groups = {};
var runningTelegramApiLongPolling = null;
var waiting_private_answer = {};
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