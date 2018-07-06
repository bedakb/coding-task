import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import CustomerView from '@/views/CustomerView'
import VueRouter from 'vue-router'

import moxios from 'moxios'

describe('CustomerView', () => {

    let wrapper,
        pushSpy

    beforeEach(() => {
        moxios.install()
        const localVue = createLocalVue()
        
        pushSpy = jest.fn()

        wrapper = mount(CustomerView, {
            mocks: {
                localVue,
                $router: {
                    push: pushSpy,
                },
                $route: {
                    name: 'Customer',
                    params: { id: 1}
                }
            }
        })
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('renders customer form', () => {
        expect(wrapper.contains('form')).toBe(true)
    })

    it('fetch data for single customer', (done) => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: { _id: 1, name: { first: 'Belmin', last: 'Bedak' }}
            }).then(() => {
                let input = wrapper.find('input.first')
                expect(input.element.value).toBe('Belmin')
                done()
            })
        })
    })

    it('close the edit form on success update', (done) => {
        let form = wrapper.find('form')
        form.trigger('submit')

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200
            }).then(() => {
                expect(pushSpy).toHaveBeenCalledWith('/')
                done()
            })
        })
    })

    it('close the edit form on success remove', (done) => {
        let remove = wrapper.find('button.remove')
        remove.trigger('click')

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200
            }).then(() => {
                expect(pushSpy).toHaveBeenCalledWith('/')
                done()
            })
        })
    })

})