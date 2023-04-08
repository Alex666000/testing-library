import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
    test("renders App component", async () => {
        render(<App/>);
        await screen.findByText(/Logged in as/);
        expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
        // fireEvent.change(screen.getByRole("textbox"), {
        //   target: { value: "React" },
        // });

        // находит нужный инпут и вводит туда текст -- текст передается напрямую
        userEvent.type(screen.getByRole("textbox"), "React");
        expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
    });
});

describe("events", () => {
    it("checkbox click", () => {
        // ссылка на ДОМ элемент инпут
        const {container} = render(<input type="checkbox"/>);
        const checkbox = container.firstChild;
        expect(checkbox).not.toBeChecked();
        // fireEvent.click(checkbox);
        userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it("double click", () => {
        const onChange = jest.fn();
        const {container} = render(<input type="checkbox" onChange={onChange}/>);
        const checkbox = container.firstChild;
        userEvent.dblClick(checkbox);
        expect(onChange).toHaveBeenCalledTimes(2);
    });

    it("tab(перемещение по интерфейсу табом)", () => {
        render(
            <div>
                <input data-testid="element" type="checkbox"/>
                <input data-testid="element" type="radio"/>
                <input data-testid="element" type="number"/>
            </div>
        );
        // находим все поля
        const [checkbox, radio, number] = screen.getAllByTestId("element");
        // имулируем нажатие таб
        userEvent.tab();
        // идем по порядку сверху вниз
        expect(checkbox).toHaveFocus();
        userEvent.tab();
        expect(radio).toHaveFocus();
        userEvent.tab();
        expect(number).toHaveFocus();
    });

    it("select", () => {
        render(
            <select>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
            </select>
        );
// нашли селект и имитируем выбор его
        userEvent.selectOptions(screen.getByRole("combobox"), "1");
        expect(screen.getByText("A").selected).toBeTruthy();
        // роль элемента селект это: combobox - второй аргумент это значение которое пользователь выбирает
        userEvent.selectOptions(screen.getByRole("combobox"), "2");
        // опция "B" выбрана
        expect(screen.getByText("B").selected).toBeTruthy();
        // с опции А" выбор снят
        expect(screen.getByText("A").selected).toBeFalsy();
    });
});
/*
userEvent - имитируем реальное поведение браузера более точно и подробнее fireEvent-та -- реальное взаимодецствие пользователя и интерфейса

getByRole("combobox") - роль если не знаем элемента то гуглим...
 */