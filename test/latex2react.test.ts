import Context from '../src/latex2react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

Enzyme.configure({ adapter: new Adapter() })

/**
 * LaTeX2React
 */
describe('LaTeX2React', () => {
  it('works if true is truthy', () => {
    const math = '$\\fx(dx)$'
    const wrapper = mount(React.createElement(Context, { math: math }))
    const p = wrapper.find('.toggle-todo')
    expect(p.text()).toBe('Buy Milk')
  })
})
