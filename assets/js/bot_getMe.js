function bot_getMe() {
    return bot('getMe', {}).done(function(response) {
        if (response.ok) {
            const botInfo = response.result;
            window.botUsername = botInfo.username;
            sys_log_Send(`Bot info: ${botInfo.first_name} (@${botInfo.username})`, 'text-info');
        } else {
            sys_log_Send(`Failed to get bot info: ${response.description}`, 'text-danger');
        }
    });
}