function helper_mentionPlayer(userid, groupid){
    const group = groups[groupid];
    if(!group){
        console.log("error group "+groupid)
        sys_log_Send("error group "+groupid);
        return;
    }
    const player = group.players.find(i=>i.id == userid);
    if(!player){
        console.log("error player group "+userid)
        sys_log_Send("error player group "+userid);
        return;
    }
    return `<a href='tg://user?id=${userid}'>${player.first_name}</a>`
}