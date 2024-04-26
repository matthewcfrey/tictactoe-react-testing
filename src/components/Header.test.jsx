import {render, screen} from '@testing-library/react'

import Header from './Header'

// https://testing-library.com/docs/queries/byrole/#api

test('Header contains correct text', () => {
    render(<Header />)

    const headerTextElement = screen.getByRole('heading')

    expect(headerTextElement).toHaveTextContent(/Tic Tac Toe/i)
})