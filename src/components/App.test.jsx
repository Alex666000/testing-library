import React from 'react';
import { render, screen } from '@testing-library/react';
import App from "./App";
import userEvent from "@testing-library/user-event";
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
        expect(screen.getByText('Find course')).toBeInTheDocument()
    });
    it("каждый раз когда то что набираем набирается работает...", function () {
        render(<App/>)
        // если будем искать того что на экране еще нету
        // ищем по отображаемому значению
        expect(screen.queryAllByDisplayValue(/React/)).toBeNull()

        // напечатали слово React
        userEvent.type(screen.getByRole('textbox', 'React'))
        expect(screen.queryAllByDisplayValue(/React/)).toBeInTheDocument()
    });
    it("проверим работает ли фильтрация?", function () {
        render(<App/>)

        expect(screen.getByText(/css/i)).toBeInTheDocument()
        expect(screen.getByText(/js/i)).toBeInTheDocument()

        userEvent.type(screen.getByRole('textbox', 'html'))

        expect(screen.queryByText(/Vue/)).toBeNull()
    });
})



/*

 */