const Input = ({ label, type = 'text', error, ...props }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      {label && <label htmlFor={props?.name}>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          size="10"
          type={type}
          className="bg-gray-900 border-gray-500 border-2 rounded-md p-4 text-lg text-center placeholder-gray-400 placeholder-opacity-60 focus:ring-yellow-500 focus:border-yellow-500"
          {...props}
        />
      ) : (
        <input
          type={type}
          className="bg-gray-900 border-gray-500 border-2 rounded-md p-4 text-lg text-center placeholder-gray-400 placeholder-opacity-60 focus:ring-yellow-500 focus:border-yellow-500"
          {...props}
        />
      )}
      {error && (
        <span className="text-red-400 font-bold text-sm text-center">
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
