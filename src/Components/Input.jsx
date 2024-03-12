const Input = ({label}) => {

    return(
        <>
        <label htmlFor="Num">Num {label}
        <input type="number" name="Num" id="Num"/>
        </label>
        </>
    )
}

export default Input;