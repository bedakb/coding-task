import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView'

import axios from 'axios'

jest.mock('axios', () => ({
    get: jest.fn()
}))

describe('HomeView', () => {

    beforeEach(() => {
        axios.get.mockClear()
        axios.get.mockReturnValue(Promise.resolve({}))
    })

    it('fetch data from endpoint and render results in table', () => {
     
        const response = {
            data: [
                { _id: 1, name: { first: 'Belmin', last: 'Bedak' } }
            ]
        }

        axios.get.mockReturnValue(Promise.resolve(response))

        let wrapper = mount(HomeView)
        wrapper.vm.$nextTick(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8081/customers')
            let table = wrapper.find('.table')

            expect(table.html()).toContain('<td>Belmin</td>')
        })

    })

})