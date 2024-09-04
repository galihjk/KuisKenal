var sys_reportRunning_msgid = null;
function sys_reportRunning(getMsgId = false) {
    if(getMsgId){
        $.ajax({
            url: `https://galihjk.my.id/botReport/newInstance.php`,
            type: 'GET',
            data: {
                botUsername: botUsername
            },
            dataType: 'json'
        }).done(function(response) {
            sys_reportRunning_msgid = response.msgid;
            console.log('new sys_reportRunning',botUsername,sys_reportRunning_msgid);
        });
        
    }
    else{
        if(sys_reportRunning_msgid){
            $.ajax({
                url: `https://galihjk.my.id/botReport/update.php`,
                type: 'GET',
                data: {
                    botUsername: botUsername,
                    msgid: sys_reportRunning_msgid,
                },
                dataType: 'json'
            }).done(function(response) {
                console.log('update reported',botUsername,sys_reportRunning_msgid);
            });
        }
        else{
            console.log('sys_reportRunning sys_reportRunning_msgid empty')
        }
    }
}