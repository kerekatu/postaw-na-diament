// create a new room by a host
async function createRoomWithHost({ roomId, hostId }) {
  try {
    const room = await strapi.services.rooms.create({ roomId, hostId });
    return room;
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
  }
}

async function deleteRoom(roomId) {
  try {
    const room = await strapi.services.rooms.delete({ roomId });
    return room;
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
  }
}

// query players by roomId (in room)
async function getPlayersInRoom(roomId) {
  try {
    const playersInRoom = await strapi.services.players.find({ roomId });
    playersInRoom.forEach((data) => delete data?.socketId);
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

async function findRoomByHostId(hostId) {
  try {
    const roomExists = await strapi.services.rooms.findOne({ hostId });
    return roomExists;
  } catch (error) {
    console.log("Coś poszło nie tak!", error);
  }
}

// insert player and player data to DB
async function createPlayer({ username, roomId, status, isHost, socketId }) {
  try {
    const player = await strapi.services.players.create({
      username,
      roomId,
      status,
      isHost,
      socketId,
    });

    return player;
  } catch (error) {
    console.log("Gracz nie mógł zostać utworzony!", error);
  }
}

async function updatePlayersInRoom({ status, money, roomId }) {
  try {
    // object to change
    const players = await strapi.services.players.find({ roomId });
    players.forEach(async (player) => {
      await strapi.services.players.update(
        { username: player?.username, roomId },
        { status, money }
      );
    });

    return players;
  } catch (error) {
    console.log("Gracze nie mogli zostać edytowani!", error);
  }
}

async function deletePlayer(socketId) {
  try {
    const player = await strapi.services.players.delete({ socketId });
    return player;
  } catch (error) {
    console.log("Gracz nie mógł zostać usunięty!", error);
  }
}

async function deletePlayers(roomId) {
  try {
    const players = await strapi.services.players.delete({ roomId });
    return players;
  } catch (error) {
    console.log("Gracze nie mogli zostać usunięci!", error);
  }
}

module.exports = {
  createRoomWithHost,
  deleteRoom,
  getPlayersInRoom,
  findPlayer,
  createPlayer,
  updatePlayersInRoom,
  deletePlayer,
  deletePlayers,
  findRoomById,
  findRoomByHostId,
};
