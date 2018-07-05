import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import CustomerView from '@/views/CustomerView'
import VueRouter from 'vue-router'

import moxios from 'moxios'

describe('CustomerView', () => {

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('renders customer form', () => {
        let wrapper = mount(CustomerView)

        expect(wrapper.contains('form')).toBe(true)
    })

})