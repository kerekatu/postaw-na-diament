import JoinRoomForm from '@/components/JoinRoomForm'
import Layout from '@/components/containers/Layout'
import Image from 'next/image'
import { useState } from 'react'
import CreateRoomForm from '@/components/createRoomForm'
import { PlayIcon, PlusCircleIcon } from '@heroicons/react/outline'

const TABS = ['TAB_JOIN', 'TAB_CREATE']

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(TABS[0])

  return (
    <Layout customMeta={{ subtitle: '- Gra Internetowa' }}>
      <section className="flex flex-col min-w-full items-center justify-center">
        <div className="flex flex-col w-[500px]">
          <Image
            src="/static/logo.svg"
            alt="Logo Uncut Diamonds"
            className="pointer-events-none"
            height={150}
            width={400}
          />
          <ul className="flex bg-gray-700 text-xl rounded-t-md">
            <li
              className={`${
                selectedTab.includes(TABS[0])
                  ? 'bg-gray-500 text-opacity-100'
                  : 'border-gray-800  text-opacity-30'
              } flex items-center justify-center gap-2 flex-1 p-2 rounded-tl-md font-bold cursor-pointer text-gray-200 transition-colors hover:bg-gray-500`}
              onClick={() => setSelectedTab(TABS[0])}
            >
              <PlayIcon className="h-5" />
              Dołącz
            </li>
            <li
              className={`${
                selectedTab.includes(TABS[1])
                  ? 'bg-gray-500 text-opacity-100'
                  : 'border-gray-800  text-opacity-30'
              } flex items-center justify-center gap-2 flex-1 p-2 rounded-tr-md font-bold cursor-pointer text-gray-200 transition-colors hover:bg-gray-500`}
              onClick={() => setSelectedTab(TABS[1])}
            >
              <PlusCircleIcon className="h-5" />
              Stwórz Pokój
            </li>
          </ul>
          <div className="bg-gray-800 p-8 rounded-b-md">
            {selectedTab.includes(TABS[0]) ? (
              <JoinRoomForm />
            ) : (
              <CreateRoomForm />
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
