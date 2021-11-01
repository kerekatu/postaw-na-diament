const BUTTON_STYLES = {
  primary:
    'bg-yellow-400 text-gray-900 font-bold px-6 py-2 border-b-2 rounded-md border-yellow-600 transition-colors hover:bg-yellow-300',
}

const Button = ({
  className,
  type = 'button',
  variant,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${BUTTON_STYLES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
