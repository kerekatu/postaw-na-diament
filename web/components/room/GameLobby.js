import Button from '@/components/common/Button'

const GameLobby = ({ handleStartGame, isHost }) => {
  return (
    <div className="flex flex-col gap-6 col-span-4 row-span-2 self-center justify-center items-center">
      <h2 className="text-4xl dots text-green-500 text-center">
        Zaczekaj aż gra się zacznie
      </h2>
      {isHost && (
        <Button variant="primary" color="yellow" onClick={handleStartGame}>
          Zacznij grę
        </Button>
      )}
    </div>
  )
}

export default GameLobby
