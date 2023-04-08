import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    render(<App/>);
    // ищем элемент по тексту через регулярку
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();

//отрисуем компонент Арр
    render(<App/>);
    //  запускаем тест и увидем полную разметку нашего приложения
    screen.debug();
});

/*
Используя реакт тестинг library - получим реальный доступ к ДОМ узлам


 */



