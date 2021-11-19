const BUTTON_STYLES = {
  primary: {
    style: 'font-bold px-6 py-2 border-b-2 rounded-md  transition-colors',
    colors: {
      yellow:
        'bg-yellow-400 text-gray-900 border-yellow-600 hover:bg-yellow-300',
      blue: 'bg-blue-500 text-gray-900 border-blue-600 hover:bg-blue-400',
    },
  },
}

const Button = ({
  className,
  type = 'button',
  color,
  variant,
  link,
  children,
  ...props
}) => {
  return (
    <>
      {!link ? (
        <button
          type={type}
          className={`${BUTTON_STYLES[variant].style} ${BUTTON_STYLES[variant].colors[color]} ${className}`}
          {...props}
        >
          {children}
        </button>
      ) : (
        <a
          href={link}
          className={`${BUTTON_STYLES[variant].style} text-center ${BUTTON_STYLES[variant].colors[color]} ${className}`}
          {...props}
        >
          {children}
        </a>
      )}
    </>
  )
}

export default Button
