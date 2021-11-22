import { addSpaceEveryCharacter } from '@/libs/helpers'

const GameSidebar = ({ player, roomPlayers }) => {
  return (
    <aside className="flex flex-col col-span-2 row-span-2 gap-6 text-lg">
      <div className="bg-gray-700 rounded-md p-4">
        <div className="flex items-center gap-2">
          <strong>Numer pokoju:</strong>
          <button
            className="bg-gray-800 text-gray-400 px-4 transition-colors rounded-md hover:text-white"
            onClick={() => {
              navigator.clipboard.writeText(player.roomId)
            }}
          >
            kopiuj
          </button>
        </div>
        <p className="truncate">
          <strong>Gracz:</strong> {player?.username}
        </p>
        <p>
          <strong>Finanse:</strong> {addSpaceEveryCharacter(player?.money)}d
        </p>
      </div>
      <div className="bg-gray-700 rounded-md p-4 overflow-y-auto items-start max-h-96">
        <ul className="flex flex-col gap-4">
          {roomPlayers.length > 0 &&
            roomPlayers?.map((item, index) => (
              <li
                key={index}
                className={`py-2 px-2 ${
                  item.username === player.username
                    ? ' bg-gray-600 rounded-md'
                    : ''
                }`}
              >
                <div className="flex justify-between gap-4 overflow-hidden">
                  <p className="truncate">{item.username}</p>
                  <span>{addSpaceEveryCharacter(item?.money)}d</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  )
}

export default GameSidebar
