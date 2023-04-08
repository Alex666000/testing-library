import React from "react";
import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// мокаем стороннии модуль аксиос
// мокаем функции с помощью которого осуществляется запрос, потом добавляем в стаб данные ответа
// то есть  сами конструируем ответ от сервиса и проверяем состояние нашего компонента или результат отрисовки
// начинаем с подмены данных - мокаем аксиос
jest.mock("axios");
const hits = [
    { objectID: "1", title: "Angular" },
    { objectID: "2", title: "React" },
];

describe("App", () => {
    it("fetches news from an API", async () => {
        // в замоканном аксиос переписываем реализацию метода get - mockImplementationOnce() -- сюда передаем функцию возвращающую промисс
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
        render(<App />);
        // нажимаем на кнопку
        userEvent.click(screen.getByRole("button"));
        // получаем данные и ищем в разметки наш список
        const items = await screen.findAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            "http://hn.algolia.com/api/v1/search?query=React"
        );
    });
// негативный ответ:
    it("fetches news from an API and reject", async () => {
        // Promise.reject
        axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
        render(<App />);
        userEvent.click(screen.getByRole("button"));
        // поиск ошибки
        const message = await screen.findByText(/Something went wrong/);
        expect(message).toBeInTheDocument();
    });
// так можно ожидать выполнение промисс более явно
    it("fetches news from an API (alternative)", async () => {
        const promise = Promise.resolve({ data: { hits } });
        axios.get.mockImplementationOnce(() => promise);
        render(<App />);
        userEvent.click(screen.getByRole('button'));
        // обертка act
        await act(() => promise);
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
});
/*
переопределение логики внешних модулей например:     axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

 */
