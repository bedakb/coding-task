import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import CustomerView from '@/views/CustomerView'
import VueRouter from 'vue-router'

import moxios from 'moxios'

describe('CustomerView', () => {

    let wrapper

    beforeEach(() => {
        moxios.install()
        const localVue = createLocalVue()
        localVue.use(VueRouter)
        wrapper = mount(CustomerView, {
            mocks: {
                localVue,
                $route: {
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

})