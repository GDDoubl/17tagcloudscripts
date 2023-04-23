const Admins = [
    
]
const Moderators = [
   
]
handlers.ReturnCurrentVersion = function(args){
    return {"ResultCode":0,"BannedUsers":"21","MOTD":"NO MORE FORTNITE","SynchTime":"21", "Message":"live11129"}
    __1_("Returning Current Version")
}

function ReportButtonNames(intButton) {
    switch (intButton) {
        case 0:
            return "HATE SPEECH.";
        case 1:
            return "CHEATING.";
        case 2:
            return "TOXICITY.";
        case 3:
            return "CANCEL.";
        default:
            return "NOT ASSIGNED.";
    }
}
 
handlers.BroadcastMyRoom = function(args){
    var KeyToFollow = args.keyToFollow;
    var RoomToJoin = args.roomToJoin;
    var Set = args.create;
    __1_("Broadcasting room... key to follow is : " + keyToFollow + "Room To Join / Joining Room : " + roomToJoin + "Value is : " + Set);
}
 
__1_ = function(text){
    var contentBody = {
    "content": text
    };
    var url = "";
    var method = "post";
    var contentType = "application/json";
    var headers = {};
    http.request(url,method,JSON.stringify(contentBody),contentType,headers);
}
handlers.RoomEventRaised = function (args) {
    var eventData = args.Data;
    __1_("Room Event Raised: " + args.GameId + " Event Crap: " + args.eventData)
 
    switch (eventData.eventType) {
        case "playerMove":
            processPlayerMove(eventData);
            break;
 
        default:
            break;
    }
 
    if (args.EvCode.toString() == "8"){
        __1_(" SET OFF ROOM EVENT: " + args.EvCode.toString())
    }
    if (args.EvCode.toString() == "50"){
            __1_("**Reported: ** " + args.Data[0] + " Reason: " + ReportButtonNames(args.Data[1]) + " In Room: " + args.GameId + "Moderator Username: " + args.Nickname + "**Reported Username: ** " + args.Data[2])
 
        if (Admins.includes(currentPlayerId) && !Moderators.includes(currentPlayerId)){
            __1_(" Admin Reported: " + args.Data[0] + " Reason: " + ReportButtonNames(args.Data[1]) + " In Room: " + args.GameId + " Admin Username: " + args.Nickname)
        }
        if (Moderators.includes(currentPlayerId) && !Admins.includes(currentPlayerId)){
           __1_("**Moderator Reported: ** " + args.Data[0] + " Reason: " + ReportButtonNames(args.Data[1]) + " In Room: " + args.GameId + "Moderator Username: " + args.Nickname + "**Reported Username: ** " + args.Data[2])
        }
    }
 
    if (args.EvCode.toString() == "51"){
        __1_(" Muted: " + args.Data[0] + " In Room: " + args.GameId)
    }
 
    __1_(" SET OFF ROOM EVENT: " + args.EvCode.toString())
};
