import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView'

import moxios from 'moxios'

describe('HomeView', () => {

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })
    
    it('fetch data from endpoint and render results in table', (done) => {
        let wrapper = mount(HomeView)

        moxios.stubRequest('http://localhost:8081/customers', {
            status: 200,
            response: [{ _id: 1, name: { first: 'Belmin', last: 'Bedak' }}]
        })

        moxios.wait(() => {
            let table = wrapper.find('.table')
            expect(table.html()).toContain('<td>Belmin</td>')
            done()
        })
    })

    it('display loading spinner if data is loading', () => {
        let wrapper = mount(HomeView)

        wrapper.setData({ isLoading: true })

        expect(wrapper.find('.loading').exists()).toBe(true)
    })

})