import { ChevronDownIcon } from '@heroicons/react/outline'

const GameTab = ({ children, handleTabs, openTabs, title }) => {
  return (
    <div className="bg-gray-700 rounded-md">
      <div
        className={`text-xl font-bold bg-gray-600 py-4 px-6 flex items-center justify-between cursor-pointer ${
          openTabs ? 'rounded-t-md' : 'rounded-md'
        }`}
        onClick={handleTabs}
      >
        <span>{title}</span>
        <ChevronDownIcon className="h-5" />
      </div>
      {openTabs && children}
    </div>
  )
}

export default GameTab
