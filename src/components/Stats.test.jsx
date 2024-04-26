import {render, screen} from '@testing-library/react'

import Stats from './Stats'


describe("Stats contains all labels", () => {
    test('Stats contains Player 1 win label', () => {
        render(<Stats />)
        const p1Label = screen.getByRole('heading', {name: /player one wins:/i})
        expect(p1Label).toBeInTheDocument()
    })
    test('Stats contains Player 2 win label', () => {
        render(<Stats />)
        const p2Label = screen.getByRole('heading', {name: /player two wins:/i})
        expect(p2Label).toBeInTheDocument()
    })
    test('Stats contains Ties label', () => {
        render(<Stats />)
        const tiesLabel = screen.getByRole('heading', {name: /ties:/i})
        expect(tiesLabel).toBeInTheDocument()
    })
})
