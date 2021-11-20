import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [currentAnswers, setCurrentAnswers] = useState([])
  const { data: question, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/${currentQuestion}`
  )

  useEffect(() => {
    if (!question) return

    setCurrentAnswers([])

    const getAnswersInArray = () => {
      for (const [key, value] of Object.entries(question)) {
        if (key.toString().includes('answer') && value !== null) {
          setCurrentAnswers((prevState) => [...prevState, value])
        }
      }
    }

    getAnswersInArray()

    return () => getAnswersInArray()
  }, [question, currentQuestion])

  if (!question) return <></>

  return (
    <>
      {/* {question.illustration && (
          <div className="mb-10 h-80 rounded-md relative transition-all hover:h-[600px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${question.illustration.url}`}
              alt={`Illustration to the question "${question.title}"`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )} */}
      <div className="bg-gray-600 p-10 rounded-md mb-10">
        <span className="font-bold text-lg uppercase text-gray-400 pb-2 block">
          Pytanie {currentQuestion}
        </span>
        <h2 className="text-3xl font-bold">{question.title}</h2>
      </div>
      <div className="flex items-center mb-10 gap-4">
        <span className="text-xl font-bold">Obstaw:</span>
        <div className="bg-gray-500 px-4 py-2 text-xl rounded-md">1000</div>
        <button className="bg-gray-500 px-4 py-2 text-xl font-bold rounded-md text-green-500">
          +
        </button>
        <button className="bg-gray-500 px-4 py-2 text-xl font-bold rounded-md text-red-500">
          -
        </button>
      </div>
      <div className="grid grid-cols-2 gap-12">
        {currentAnswers.map((answer, index) => (
          <button
            key={index}
            className={`hover:bg-gray-600 text-2xl bg-gray-500 rounded-md p-10 border-b-4 border-gray-600 relative overflow-hidden ${
              selectedAnswer === answer &&
              'border-yellow-500 bg-yellow-500 text-gray-900 hover:bg-yellow-500'
            }`}
            onClick={() => setSelectedAnswer(answer)}
          >
            <span className="text-gray-800 uppercase text-7xl font-bold absolute top-1/2  transform left-12 -translate-y-1/2 opacity-50">
              {ALPHABET[index]}
            </span>
            {answer}
          </button>
        ))}
      </div>
    </>
  )
}

export default Game
