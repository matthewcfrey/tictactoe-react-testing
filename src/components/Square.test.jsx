import {render, screen} from '@testing-library/react'

import Square from './Square'


describe('Squares show correct marks passed from props', () => {
    test("Square is blank when no mark", () => {

        render(<Square mark='' />)
        const square1 = screen.getByTestId('tttsquare')
        expect(square1).toHaveTextContent('')
    })
    test("Square has X when passed X", () => {
    
        render(<Square mark='X' />)
        const square2 = screen.getByTestId('tttsquare')
        expect(square2).toHaveTextContent('X')
    })
    
    test("Square has O when passed O", () => {
    
        render(<Square mark='O' />)
        const square3 = screen.getByTestId('tttsquare')
        expect(square3).toHaveTextContent('O')
    })
})
