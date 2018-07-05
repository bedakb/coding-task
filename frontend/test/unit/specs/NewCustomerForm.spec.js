import { mount } from '@vue/test-utils'
import NewCustomerForm from '@/components/NewCustomerForm'

import moxios from 'moxios'

describe('NewCustomerForm', () => {

    let wrapper

    beforeEach(() => {
        moxios.install()
        wrapper = mount(NewCustomerForm)
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('shows the form on button click', () => {
        let button = wrapper.find('button.add'),
            form = wrapper.find('form')

        expect(form.isVisible()).toBe(false)

        button.trigger('click')

        expect(form.isVisible()).toBe(true)
    })

    it('emits customer data when its created', (done) => {
        let form = wrapper.find('form'),
            input = wrapper.find('input.first')

        input.element.value = 'Sansa'
        form.trigger('submit')

        moxios.stubRequest('http://localhost:8081/customers', {
            status: 200
        })

        moxios.wait(() => {
            expect(wrapper.emitted().create).toBeTruthy()
            done()
        })

    })

})