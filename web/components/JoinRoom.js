import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { joinSchema } from '@/libs/yup'
import { useEffect, useState } from 'react'
import { socket } from '@/libs/web-sockets'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { playerDataState } from '@/libs/atoms'
import Button from './common/Button'
import Input from './common/Input'

const JoinRoom = () => {
  const [errorMessageOnResponse, setErrorMessageOnResponse] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(joinSchema) })
  const router = useRouter()
  const setPlayerData = useSetRecoilState(playerDataState)

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
            setPlayerData((prevPlayerData) => [...prevPlayerData, playerData])
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
      {errorMessageOnResponse && <p>{errorMessageOnResponse}</p>}
    </form>
  )
}

export default JoinRoom
