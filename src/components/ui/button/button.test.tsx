import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Тестирование Button', () => {
  it('Button без текста', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('Button с текстом', () => {
    const button = renderer.create(<Button text="test" />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('Button заблокированные', () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('Button c индикацией загрузки', () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  })

  it('Button нажатие', () => {
    const callbackFunction = jest.fn();
    render(<Button text="testCallback" onClick={callbackFunction} />);
    const button = screen.getByText("testCallback");
    fireEvent.click(button);
    expect(callbackFunction).toHaveBeenCalledTimes(1);
  })
})