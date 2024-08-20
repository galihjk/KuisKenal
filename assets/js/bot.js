function bot(method, params) {
    return $.ajax({
        url: `https://api.telegram.org/bot${botToken}/${method}`,
        type: 'POST',
        data: params,
        dataType: 'json'
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if(textStatus != 'abort'){
            sys_log_Send(`Error: ${textStatus} - ${errorThrown} - ${jqXHR.responseJSON?.description}`, "text-danger");
            stopBot();
        }
    });
}
