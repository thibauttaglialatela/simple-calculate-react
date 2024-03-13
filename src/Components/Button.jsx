function Button({buttonText, handleClick}) {

    return(
        <>
        <button onClick={handleClick} type="button">{buttonText}</button>
        </>
    )
}

export default Button;