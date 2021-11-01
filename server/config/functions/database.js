// query players by roomId (in room)
async function getPlayersInRoom(roomId) {
  try {
    const playersInRoom = await strapi.services.players.find({ roomId });
    return playersInRoom;
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
  }
}

// query player by username and roomId
async function findPlayer(username, roomId) {
  try {
    const playerExists = await strapi.services.players.find({
      username,
      roomId,
    });
    return playerExists;
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
  }
}

// query room by ID
async function findRoomById(roomId) {
  try {
    const roomExists = await strapi.services.rooms.findOne({ roomId });
    return roomExists;
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
  }
}

// insert player and player data to db
async function createPlayer({ username, roomId, status, socketId }) {
  try {
    const user = await strapi.services.players.create({
      username,
      roomId,
      status,
      socketId,
    });

    return user;
  } catch (error) {
    console.log("Gracz nie mógł zostać utworzony!", error);
  }
}

module.exports = {
  getPlayersInRoom,
  findPlayer,
  createPlayer,
  findRoomById,
};
