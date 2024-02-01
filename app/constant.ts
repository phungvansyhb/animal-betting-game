export const TOPIC = {
    /* This topic has infor about : rooms , players */
    GAME_ROOM : {
        _:'game_room',
        CREATE : 'game_room:create',
        DELETE : 'game_room:delete',
        JOIN : 'game_room:join',
        QUIT : 'game_room:quit',
    },
    /* This topic has infor about games like : bet ,  */
    GAME_ACTIONS :{
        CHANGE_HOST : 'game_action:change_host',
        INACTIVE_PLAYER : 'game_action:inactive_player',
        BET : 'game_action:bet',
        START : 'game_action:start',
        PAUSE : 'game_action:pause',
        END : 'game_action:end',
    }
}
