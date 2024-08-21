function game_pilihPertanyaan_dipilih(groupid,from,selected,msgid){
    bot_editMessageText(from.id, msgid, `Dipilih:\n${selected}\n\nSilakan kembali ke grup.`)
    bot_sendMessage(groupid, selected);
}