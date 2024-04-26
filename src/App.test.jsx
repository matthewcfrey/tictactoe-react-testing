import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App.jsx'

describe("Stats Numbers Operate as Expected", () =>{
    test('Player Wins and Ties value starts at 0', () =>{
        render(<App />)
        const p1Label = screen.getByRole('heading', {name: /player one wins:/i})
        expect(p1Label).toHaveTextContent('0')

        const p2Label = screen.getByRole('heading', {name: /player two wins:/i})
        expect(p2Label).toHaveTextContent('0')

        const tiesLabel = screen.getByRole('heading', {name: /ties:/i})
        expect(tiesLabel).toHaveTextContent('0')
    })
})

describe("Test Win Conditions", () => {
    const winClicks = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const lossClicks = [
        [3,4,6],
        [0,1,6],
        [0,1,3],
        [1,2,5],
        [0,2,3],
        [0,1,7],
        [1,2,3],
        [0,1,8]
    ]
    test('Wins for X', async () => {
        const user = userEvent.setup()
        for(let i=0; i<winClicks.length; i++) {
            const {unmount} = render(<App />)
            const squares = screen.getAllByTestId('tttsquare')
            
            await user.click(squares[winClicks[i][0]])
            await user.click(squares[lossClicks[i][0]])
            await user.click(squares[winClicks[i][1]])
            await user.click(squares[lossClicks[i][1]])
            await user.click(squares[winClicks[i][2]])

            const p1Label = screen.getByRole('heading', {name: /player one wins:/i})
            expect(p1Label).toHaveTextContent('1')
            unmount()
        }
    })
    test('Wins for O', async () => {
        const user = userEvent.setup()
        for(let i=0; i<winClicks.length; i++) {
            const {unmount} = render(<App />)
            const squares = screen.getAllByTestId('tttsquare')
            
            await user.click(squares[lossClicks[i][2]])
            await user.click(squares[winClicks[i][0]])
            await user.click(squares[lossClicks[i][0]])
            await user.click(squares[winClicks[i][1]])
            await user.click(squares[lossClicks[i][1]])
            await user.click(squares[winClicks[i][2]])

            const p1Label = screen.getByRole('heading', {name: /player two wins:/i})
            expect(p1Label).toHaveTextContent('1')
            unmount()
        }
    })
})

test("Test for tie", async () => {
    const user = userEvent.setup()
        render(<App />)
        const squares = screen.getAllByTestId('tttsquare')
        
        await user.click(squares[0])
        await user.click(squares[4])
        await user.click(squares[8])
        await user.click(squares[2])
        await user.click(squares[6])
        await user.click(squares[7])
        await user.click(squares[5])
        await user.click(squares[3])
        await user.click(squares[1])

        const p1Label = screen.getByRole('heading', {name: /ties:/i})
        expect(p1Label).toHaveTextContent('1')

})

describe("Board functionality stops after a win or tie", () => {
    test('board stops after X win', async () => {
        const user = userEvent.setup()
        render(<App />)
        const squares = screen.getAllByTestId('tttsquare')
        
        await user.click(squares[0])
        await user.click(squares[3])
        await user.click(squares[1])
        await user.click(squares[4])
        await user.click(squares[2])
        await user.click(squares[5])

        expect(squares[5]).toBeEmptyDOMElement()
    })
    test('board stops after O win', async () => {
        const user = userEvent.setup()
        render(<App />)
        const squares = screen.getAllByTestId('tttsquare')
        
        await user.click(squares[6])
        await user.click(squares[0])
        await user.click(squares[3])
        await user.click(squares[1])
        await user.click(squares[4])
        await user.click(squares[2])
        await user.click(squares[5])

        expect(squares[5]).toBeEmptyDOMElement()
    })
})

test("Reset Board button resets board", async () => {
    const user = userEvent.setup()

    render(<App />)
    const resetButton = screen.getByRole('button', {name: /reset/i})

    const squares = screen.getAllByTestId('tttsquare')
    await user.click(squares[0])
    await user.click(squares[4])
    await user.click(squares[8])
    await user.click(squares[2])
    await user.click(squares[6])
    await user.click(squares[7])
    await user.click(squares[5])
    await user.click(squares[3])
    await user.click(squares[1])

    await user.click(resetButton)
    expect(squares[0]).toBeEmptyDOMElement()

    await user.click(squares[0])
    expect(squares[0]).toHaveTextContent('X')

})