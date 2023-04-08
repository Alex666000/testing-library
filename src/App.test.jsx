import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    // 1 - стандартный реакт тест
    // render(<App/>);
    // ищем элемент по тексту через регулярку
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();

    // 2
    /* отрисуем компонент Арр
        render(<App/>);
        //  запускаем тест и увидем полную разметку нашего приложения
        screen.debug();*/

    // 3 - скриншотное тестирование - снимки
    const {asFragment} = render(<App/>);
    expect(asFragment(<App/>)).toMatchSnapshot;

    // 4 Search variants
    /*
    Search variants:

      getBy:                    queryby:                    findBy:

    - getByText               - queryByText               - findByText
    - getByRole               - queryByRole               - findByRole
    - getByLabelText          - queryByLabelText          - findByLabelText
    - getByPlaceholderText    - queryByPlaceholderText    - findByPlaceholderText
    - getByAltText            - queryByAltText            - findByAltText
    - getByDisplayValue       - queryByDisplayValue       - findByDisplayValue
    - getAllBy                - queryAllBy                - findAllBy
    */

    /*
    Assertive Functions:

    - toBeDisabled            - toBeEnabled               - toBeEmpty
    - toBeEmptyDOMElement     - toBeInTheDocument         - toBeInvalid
    - toBeRequired            - toBeValid                 - toBeVisible
    - toContainElement        - toContainHTML             - toHaveAttribute
    - toHaveClass             - toHaveFocus               - toHaveFormValues
    - toHaveStyle             - toHaveTextContent         - toHaveValue
    - toHaveDisplayValue      - toBeChecked               - toBePartiallyChecked
    - toHaveDescription
    */

    describe("App", () => {
        it("renders App component", async () => {
            render(<App/>);
            // элемента нет в разметке:
            // expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
            expect(screen.queryByText(/Logged in as/)).toBeNull();
            // разметка без данных
            screen.debug();

            // после получения данных в разметке появится эта строка
            expect(await screen.findByText(/Logged in as/)).toBeInTheDocument();
            // разметку получили новую с данными отличается от разметки стр 56
            screen.debug();

            // Assertive Functions Examples:
            expect(screen.getByAltText(/search image/)).toHaveClass("image");
            expect(screen.getByLabelText(/search/i)).not.toBeRequired();
            expect(screen.getByLabelText(/search/i)).toBeEmpty();
            expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
        });
    });


});

/*
Используя реакт тестинг library - получим реальный доступ к ДОМ узлам

toBeNull(); toBeInTheDocument(); - для проверки наличия элем.

getByRole - поиск элементов роль кнопка для элемента кнопки
getByLabelText - поиск элементов по тексту в лейбле ищет

 getBy - (вернет или элемент или ощибку - если надо наити элемент используем его - если покахзать что элем нет в ДОМе то обязательно queryby)
 queryby - когда элемента нет в разметке используем его вместо findByText
 findBy -  используется вариант поиска для асинхронных элементов когда изначально элемента в разметке не было но при выполнении асинхр кода они появятся стр 5, 25 Арр.tsx

getAllBy - если элементов несколько AllBy используем
 */