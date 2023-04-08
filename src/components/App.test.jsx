import React from 'react';
import { render, screen } from '@testing-library/react';
import App from "./App";
/*
test('renders learn react link', () => {
  // отрисовка
  render(<App />);
  // поиск по экрану на странице
  const linkElement = screen.getByText(/learn react/i);
  // ожидаем
  expect(linkElement).toBeInTheDocument();
});*/

describe('App component',() => {
    it("should rendering", function () {
        render(<App/>)
        // screen.debug()
        expect(screen.getByRole('list')).toBeInTheDocument()
    });
})



/*

 */