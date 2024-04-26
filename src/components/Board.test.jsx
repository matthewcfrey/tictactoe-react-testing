import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Board from './Board'
import Square from './Square'

test('The board exists on the page', () => {
    render(<Board />)

    const board = screen.getByTestId('tttboard')

    expect(board).toBeInTheDocument()
})

test('The board has 9 squares', () => {
    render(<Board />)

    const squares = screen.getAllByTestId('tttsquare')

    expect(squares).toHaveLength(9)
})

describe("The squares when clicked have X and O in correct order", () => {
    test('Squares when clicked first get an X', async () => {
        const user = userEvent.setup()

        for(let i=0; i<9; i++) {
            const {unmount} = render(<Board />)
            const squares = screen.getAllByTestId('tttsquare')

            await user.click(squares[i])
            expect(squares[i]).toHaveTextContent('X')
            unmount()
        }
    })
    test('Squares when clicked second get an O', async () => {
        const user = userEvent.setup()

        for(let i=0; i<9; i++) {
            const {unmount} = render(<Board />)
            const squares = screen.getAllByTestId('tttsquare')
            
            const j = ((i-1) + 9) % 9

            await user.click(squares[j])
            expect(squares[j]).toHaveTextContent('X')
            await user.click(squares[i])
            expect(squares[i]).toHaveTextContent('O')
            unmount()
        }
    })
    test('Squares when clicked third get an X', async () => {
        const user = userEvent.setup()

        for(let i=0; i<9; i++) {
            const {unmount} = render(<Board />)
            const squares = screen.getAllByTestId('tttsquare')
            
            const j = ((i-1) + 9) % 9
            const k = ((i-2) + 9) % 9

            await user.click(squares[j])
            expect(squares[j]).toHaveTextContent('X')
            await user.click(squares[i])
            expect(squares[i]).toHaveTextContent('O')
            await user.click(squares[k])
            expect(squares[k]).toHaveTextContent('X')
            unmount()
        }
    })
})

test('Squares with a mark do not change their mark', async () => {
    const user = userEvent.setup()

    render(<Board />)
    const squares = screen.getAllByTestId('tttsquare')
    
    await user.click(squares[0])
    expect(squares[0]).toHaveTextContent('X')
    await user.click(squares[0])
    expect(squares[0]).toHaveTextContent('X')

    await user.click(squares[1])
    expect(squares[1]).toHaveTextContent('O')
    await user.click(squares[1])
    expect(squares[1]).toHaveTextContent('O')
    
})
