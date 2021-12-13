import { addSpaceEveryCharacter } from '@/libs/helpers'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import Button from '@/components/common/Button'
import { useState } from 'react'
import GameTab from '@/components/room/GameTab'

const GameSidebar = ({ player, roomPlayers }) => {
  const [openTabs, setOpenTabs] = useState([true, true])

  const handleTabs = (tab) => {
    setOpenTabs((prevState) =>
      prevState.map((item, idx) => (idx === tab ? !item : item))
    )
  }

  return (
    <aside className="flex flex-col col-span-2 row-span-2 gap-6 text-lg">
      <Button
        type="link"
        variant="secondary"
        link="/"
        className="flex gap-2 items-center self-start text-xl"
      >
        <ArrowLeftIcon className="h-5" /> Wyjdź
      </Button>
      <GameTab
        handleTabs={() => handleTabs(0)}
        title="Pokój - Informacje"
        openTabs={openTabs[0]}
      >
        <div className="py-4 px-6">
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
            <strong>Pieniądze:</strong> {addSpaceEveryCharacter(player?.money)}d
          </p>
        </div>
      </GameTab>
      <GameTab
        handleTabs={() => handleTabs(1)}
        title={`Gracze (${roomPlayers.length})`}
        openTabs={openTabs[1]}
      >
        <div className="overflow-y-auto items-start max-h-96">
          <ul className="p-4">
            {roomPlayers.length > 0 &&
              roomPlayers?.map((item, index) => (
                <li
                  key={index}
                  className={`p-4 ${
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
      </GameTab>
    </aside>
  )
}

export default GameSidebar
