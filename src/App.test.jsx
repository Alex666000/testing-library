import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    // async - так как делаем запрос в коде
    test("renders App component", async () => {
        // отрисовываем
        render(<App />);
        // проверяем разметку
        await screen.findByText(/Logged in as/);
        // изначально строки /Searches for JavaScript/ нету,
        expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
        // внутрь передаем найденный элемент и событие - после события изменения поля она появляется строка в документе стр 18
        fireEvent.change(screen.getByRole("textbox"), {
            target: { value: "React" },
        });
        expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
    });
});

describe("events", () => {
    it("checkbox click(клик по чекбоксу)", () => {
        // jest.fn() - нужная функция -- из результата работы функции render()  --- вместо screen используем теперь...
        const handleChange = jest.fn();
        // container  вернет ссылку на Дом элемент куда вмонтирован наш компонент
        const { container } = render(
            <input type="checkbox" onChange={handleChange} />
        );
        // получили checkbox
        // чтобы обратится к компоненту используем firstChild (можно было воспользоваться и getByRole...получили доступ к чекбоксу)
        const checkbox = container.firstChild;
        // изначально поле не выбрано
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        // слежение за функцией handleChange - что после клика она вызвана
        expect(handleChange).toHaveBeenCalledTimes(1);
        // чекбокс выбран
        expect(checkbox).toBeChecked();
    });

    it("input focus(тестируем фокус элемента)", () => {
        // с помощью этого атрибута data-testid ищем элементы в разметке осуществляется операция с помощью метода getByTestId
        render(<input data-testid="simple-input" type="text" />);
        const input = screen.getByTestId("simple-input");
        // проверяем начальное состояние не в фокусе
        expect(input).not.toHaveFocus();
        // выставляем фокус
        input.focus();
        // элемент в фокусе?
        expect(input).toHaveFocus();
    });
});
/*
реальные взаимодействия пользователей - если вводить что то в инпут компонент перерисовывается..новое значение должно отобразаться
для имитации  пользователя с нашим интерфыейсом fireEvent()

Алгоритм: находим элемент -- имулируем событие -- проверяем отклик на событие --> итогом проверяем итоговою разметку

 */
