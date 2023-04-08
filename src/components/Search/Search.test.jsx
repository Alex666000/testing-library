// т к компонент наш будет принимать функцию нам понадобится фейковая функция
// используем глобальный jest его встроенные фозможности функция fn()
import {render} from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

const onChange = jest.fn();

describe("search component", () => {
    it("проверяем что компонент рендерится вообще", function () {
        // рендерим с чилдами
        render(
            <Search value={''} onChange={onChange}>
            FIND:
        </Search>);
        expect(screen.getByText(/find/i) ).toBeInTheDocument()
    });
    it("рендерится без чилдренов", function () {
        render(<Search value={''} onChange={onChange}/>)
        // если чилды не пришли по умолчанию должно серч использоваться
        expect(screen.getByText(/seaRch/i) ).toBeInTheDocument()
    });
    it("без плейхолдера", function () {
        render(<Search value={''} onChange={onChange}/>)
        expect(screen.getByPlaceholderText(/search.../i) ).toBeInTheDocument()
    });
    it("работает кастомный плейсхолдер", function () {
        // тут явно передадим плейсхолдер
        render(<Search value={''} onChange={onChange} placeholder={'find post'}/>)
        expect(screen.getByPlaceholderText(/find Post/i) ).toBeInTheDocument()
    });
    //----------------------------------------------------------------------------
    // ВЗАИМОДЕЙСТВИЕ С ПОЛЬЗОВАТЕЛЕМ:
    it("когда печатаем текст отрабатываем onChange", function () {
        render(
            <Search value={''} onChange={onChange}>
                Find:
            </Search>)
        // делаем пользовательское действие что именно он сделал:
        // куда печатаем сначала найдем  'textbox' - поле для ввода
        // второй параметр что хотим напечатать React
        userEvent.type(screen.getByRole('textbox', 'React'))
        // теперь действие произошло и проверяем:

        // вызвана столько раз сколько ввели букв в слове Реакт...
        expect(onChange).toHaveBeenCalled(5)
    });
    it("стили будут работать динамически-проверим наличие классов просто...", function () {
        render(<Search value={'abc'} onChange={onChange}></Search>)
        // проверим что есть класс такой у ...
        expect(screen.getByRole('textbox')).toHaveClass('input')
        expect(screen.getByRole('textbox')).toHaveClass('filled')
        // т к текст не передали возьмет по умолчанию проверит по нему
        expect(screen.getByText('Search')).toHaveClass('label')
        // проверка стиля конкретного
        expect(screen.getByText('Search')).toHaveStyle('display: flex')
    });
    it("тестирование снепшотом", function () {
        render(<Search value={'abc'} onChange={onChange}>
            Find:
        </Search>)
        expect(search).toMatchSnapshot()
    });
});

/*
'textbox' - поле для ввода
 */