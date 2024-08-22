function game_pilihPertanyaan_dipilih(groupid,from,selected,msgid){
    const group = groups[groupid];
    bot_editMessageText(from.id, msgid, `Dipilih:\n${selected}\n\nSilakan kembali ke grup.`);
    group.q = selected;
    let text = helper_mentionPlayer(from.id, groupid) + " sudah memilih pertanyaan, Ayo dijawab!\n";
    + group.players.filter(p=>p.id != from.id).map(player => helper_mentionPlayer(player.id, groupid)).join("\n");
    bot_sendMessage(groupid, text, 
        {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "Jawab", url: "t.me/"+botUsername+"?start=jwb_"+groupid }],
                ]
            })
        });
}