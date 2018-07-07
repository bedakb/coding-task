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

    it('hide the create button if form is opened', () => {
        let button = wrapper.find('.button')

        button.trigger('click')

        expect(button.isVisible()).toBe(false)
    })

    it('show the form on button click', () => {
        let button = wrapper.find('button.add'),
            form = wrapper.find('form')

        expect(form.isVisible()).toBe(false)

        button.trigger('click')

        expect(form.isVisible()).toBe(true)
    })

    it('show the close button if form is open', () => {
        let button = wrapper.find('.button'),
            close = wrapper.find('.close')

        button.trigger('click')

        expect(close.isVisible()).toBe(true)
    })

    it('emit customer data when its created', (done) => {
        let form = wrapper.find('form'),
            input = wrapper.find('input.first')

        input.element.value = 'Sansa'
        form.trigger('submit')

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200
            }).then(() => {
                expect(wrapper.emitted().create).toBeTruthy()
                done()
            })
        })   
    })

})