function Button({
    children,
    textColor = "text-white",
    bgColor = "bg-blue-600",
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button