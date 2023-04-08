import {render, screen} from "@testing-library/react";

import List from "./List";


const data = ["html", "css", "js"];

describe("List component", () => {
    // it утверждение
    it.skip("List renders ", () => {
        // oтрисовываем компонент с данными items={data}
        render(<List items={data}/>);
        // ожидаем
        // на странице значит --- screen
        // expect(screen.getByText("css")).toBeInTheDocument();
        expect(screen.getByText(/css/i)).toBeInTheDocument();

        // проверили есть ли вообще список
        expect(screen.getByRole("list")).toBeInTheDocument();
    });
    it("Список рендерится без данных: items={data}", function () {
        render(<List />);
        // так как списка нет используем квури метод наиди то что должно отсутствовать по роли списка и что оно отсутстует на странице
        expect(screen.queryByRole("list")).toBeNull();
    });
    it("List snapshot (чтобы разметка не менялась делаем слепок разметки и по нему проверять что приложение не изменялось" +
        "слепок хранится как отдельный файл...)", function () {
        // создадим переменную для удобства список
        const list = render(<List items={data}/>);
        // ожидаем что список соответствует спекшоту
        expect(list).toMatchSnapshot();
    });
    it("List snapshot пустой без данных", function () {
        // создадим переменную для удобства список
        const list = render(<List />);
        // ожидаем что список соответствует спекшоту
        expect(list).toMatchSnapshot();
    });
});


/*
describe - описывает группу тестов -- называем как группу для такого то компонента
 */