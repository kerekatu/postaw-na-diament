"use strict";
const {
  findPlayer,
  createPlayer,
  findRoomById,
  getPlayersInRoom,
  deletePlayer,
  createRoomWithHost,
  findRoomByHostId,
  deletePlayers,
  deleteRoom,
  updatePlayersInRoom,
} = require("./database");
const { Server } = require("socket.io");

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  const io = new Server(strapi.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // on host creating new room & joining
    socket.on("CREATE_ROOM", async ({ username, roomId }, callback) => {
      try {
        const roomExists = await findRoomById(roomId);

        if (roomExists?.roomId) {
          callback({
            message: `Pokój z kodem (${roomId}) już istnieje`,
            status: "403",
          });
        } else {
          const room = await createRoomWithHost({ roomId, hostId: socket.id });
          const player = await createPlayer({
            username,
            roomId,
            isHost: true,
            socketId: socket.id,
          });
          const players = await getPlayersInRoom(player.roomId);

          if (room && player) {
            socket.join(player.roomId);
            callback({
              message: `Host ${username} dołączył do pokoju ${player.roomId}`,
              status: "200",
            });
            socket.emit("SET_PLAYER_DATA", {
              text: `${player.username} witamy w pokoju ${player.roomId}`,
              playerData: player,
            });
            io.to(player.roomId).emit("SET_ROOM_INFO", {
              roomId: player.roomId,
              players,
            });
          } else {
            callback(`Gracz nie mógł zostać utworzony`);
          }
        }
      } catch (error) {
        console.log("Coś poszło nie tak, ", error);
      }
    });

    // On client submitting event to join a room
    socket.on("JOIN_ROOM", async ({ username, roomId }, callback) => {
      try {
        const playerExists = await findPlayer(username, roomId);
        const roomExists = await findRoomById(roomId);

        if (playerExists.length > 0) {
          callback({
            message: `Gracz ${username} istnieje już w pokoju (${roomId})`,
            status: "403",
          });
        } else {
          if (roomExists?.roomId) {
            const player = await createPlayer({
              username,
              roomId,
              socketId: socket.id,
            });

            const players = await getPlayersInRoom(player.roomId);

            if (player) {
              socket.join(player.roomId);
              callback({
                message: `Gracz ${username} dołączył do pokoju ${player.roomId}`,
                status: "200",
              });

              socket.emit("SET_PLAYER_DATA", {
                text: `${player.username} witamy w pokoju ${player.roomId}`,
                playerData: player,
              });
              io.to(player.roomId).emit("SET_ROOM_INFO", {
                roomId: player.roomId,
                players,
              });
            }
          } else {
            callback({
              message: `Pokój (${roomId}) nie istnieje`,
              status: "403",
            });
          }
        }
      } catch (error) {
        console.log("Coś poszło nie tak, ", error);
      }
    });

    socket.on("START_GAME", async (data, callback) => {
      try {
        const room = await findRoomByHostId(data?.socketId);

        if (room) {
          await updatePlayersInRoom({
            status: "PLAYING",
            roomId: data?.roomId,
          });
          callback({ message: "Gra została rozpoczęta", status: "200" });
          io.to(data?.roomId).emit("SET_PLAYING_STATUS", {
            text: "Gra została rozpoczęta",
            isReady: true,
          });
        } else {
          callback({ message: "Nie jesteś hostem pokoju", status: "403" });
        }
      } catch (error) {
        console.log("Coś poszło nie tak, ", error);
      }
    });

    socket.on("disconnect", async () => {
      try {
        const player = await deletePlayer(socket.id);

        if (player.length > 0 && player[0].isHost) {
          io.to(player[0].roomId).emit("HOST_DISCONNECT");
          io.in(player[0].roomId).disconnectSockets();
          return Promise.allSettled([
            await deletePlayers(
              player[0].roomId,
              await deleteRoom(player[0].roomId)
            ),
          ]);
        }

        if (player.length > 0) {
          io.to(player[0].roomId).emit("message", {
            player: player[0].username,
            text: `Player ${player[0].username} has left the chat.`,
          });
          io.to(player[0].roomId).emit("SET_ROOM_INFO", {
            roomId: player[0].roomId,
            players: await getPlayersInRoom(player[0].roomId),
          });
        }
      } catch (error) {
        console.log("Coś poszło nie tak, ", error);
      }
    });
  });
};
