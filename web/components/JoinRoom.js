import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { joinSchema } from '@/libs/yup'
import { useEffect, useState, useContext } from 'react'
import { socket } from '@/libs/web-sockets'
import { useRouter } from 'next/router'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { PlayerContext } from '@/context/PlayerContext'

const JoinRoom = () => {
  const [errorMessageOnResponse, setErrorMessageOnResponse] = useState('')
  const { setPlayerData } = useContext(PlayerContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(joinSchema) })
  const router = useRouter()

  useEffect(() => {
    const messageTimer = () =>
      setTimeout(() => {
        setErrorMessageOnResponse('')
      }, 3000)

    return () => clearTimeout(messageTimer)
  }, [errorMessageOnResponse])

  const onSubmit = (data) => {
    try {
      socket.emit('join', data, (response) => {
        if (response.status === '403') {
          setErrorMessageOnResponse(response.message)
        } else {
          socket.on('welcome', ({ playerData }) => {
            setPlayerData(playerData)
            router.push(`/room/${playerData.roomId}`)
          })
        }
      })
    } catch (error) {
      setErrorMessageOnResponse(JSON.parse(error.message))
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-4 w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        placeholder="Podaj swoją nazwę"
        error={errors?.username?.message}
        {...register('username')}
      />
      <Input
        type="text"
        placeholder="Podaj numer pokoju"
        error={errors?.roomId?.message}
        {...register('roomId')}
      />
      <Button type="submit" variant="primary" className="mt-2 w-60 self-center">
        Dołącz do gry
      </Button>
      {errorMessageOnResponse && (
        <span className="text-red-400 font-bold text-sm text-center">
          {errorMessageOnResponse}
        </span>
      )}
    </form>
  )
}

export default JoinRoom
