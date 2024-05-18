

module.exports = (server) => {
    var io = require("socket.io")(server, {
        transports: ['websocket'],
        allowUpgrades: false,
        pingInterval: 25000,
        pingTimeout: 60000,
    });
    const emailToSocketIdMap = new Map();
    const socketIdToEmailMap = new Map();

    // socket connection
    io.on("connection", (socket) => {
        socket.on("join_room", (data) => {
            emailToSocketIdMap.set(data.email, socket.id);
            socketIdToEmailMap.set(socket.id, data.email);
            io.to(data.room).emit("user_joined", { email: data.email, id: socket.id })
            socket.join(data.room);
            io.to(socket.id).emit('join_room', data)
        });
        socket.on('user_call', (data) => {
            io.to(data.to).emit('incoming_call', { from: socket.id, offer: data.offer })
        });
        socket.on('call_accepted', (data) => {
            io.to(data.to).emit('call_accepted', {from:socket.id, answer: data.answer })
        });
        socket.on('negotiationneeded', (data) => {
            io.to(data.to).emit('negotiationneeded', { from: socket.id, offer: data.offer })
        });
        socket.on('negotiation_done', (data) => {
            io.to(data.to).emit('negotiation_done', { from: socket.id, answer: data.answer })
        });
    });
}