const Square = ({idx, mark, clickSquare}) => {
    return (
        <div data-testid='tttsquare' className='square' onClick={() => {clickSquare(idx)}}>{mark}</div>
    )
}

export default Square