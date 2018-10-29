'use strict';
const utils = require('../utils');

module.exports = (io, app) => {
    let allrooms = app.locals.chatrooms;

    io.of('/roomslist').on('connection', socket => {
        socket.on('getChatrooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        });

        socket.on('createNewRoom', newRoomInput => {
            // check to see if a rooom with same time exists or not
            // if not, create one and broadcast it to everyone
            if (!utils.findRoomByName(allrooms, newRoomInput)) {
                allrooms.push({
                    room: newRoomInput,
                    roomID: utils.randomHex(),
                    users: []
                });

                // Emit an updated list to the creator
                socket.emit('chatRoomsList', JSON.stringify(allrooms));
                // Emit an updated list to everyone connected to the rooms page
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            }
        });
    });
}
