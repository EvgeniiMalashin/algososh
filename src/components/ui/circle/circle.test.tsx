import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование Circle', () => {
  it('Circle без текста', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle с текстом', () => {
    const circle = renderer.create(<Circle letter="test" />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle с head', () => {
    const circle = renderer.create(<Circle head="head" />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle с элементом в head', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle с tail', () => {
    const circle = renderer.create(<Circle tail="tail" />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle с элементом в tail', () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle с index', () => {
    const circle = renderer.create(<Circle index={8} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle с isSmall', () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle в default', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle в changing', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Circle в modified', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  })
})