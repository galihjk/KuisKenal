var xhr = new window.XMLHttpRequest();
function bot(method, params, abortable = false) {
    let ajaxData = {
        url: `https://api.telegram.org/bot${botToken}/${method}`,
        type: 'POST',
        data: params,
        dataType: 'json',
    };
    if(abortable){
        ajaxData.xhr = function(){
            return xhr;
        };
    }
    return $.ajax(ajaxData).fail(function (jqXHR, textStatus, errorThrown) {
        if(textStatus != 'abort'){
            sys_log_Send(`Error: ${textStatus} - ${errorThrown} - ${jqXHR.responseJSON?.description}`, "text-danger");
        }
    });
}
