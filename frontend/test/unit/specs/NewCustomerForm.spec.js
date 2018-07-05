import { mount } from '@vue/test-utils'
import NewCustomerForm from '@/components/NewCustomerForm'

describe('NewCustomerForm', () => {

    let wrapper

    beforeEach(() => wrapper = mount(NewCustomerForm))

    it('shows the form on button click', () => {
        let button = wrapper.find('button.add'),
            form = wrapper.find('form')

        expect(form.isVisible()).toBe(false)

        button.trigger('click')

        expect(form.isVisible()).toBe(true)
    })

})