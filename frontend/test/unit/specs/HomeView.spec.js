import Vue from 'vue'
import { mount, RouterLinkStub } from '@vue/test-utils'
import HomeView from '@/views/HomeView'

import NewCustomerForm from '@/components/NewCustomerForm'

import moxios from 'moxios'

describe('HomeView', () => {

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('fetch data from endpoint and render results in table', (done) => {
        let wrapper = mount(HomeView, {
            stubs: {
                'router-link': RouterLinkStub
            }
        })

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: [{ _id: 1, name: { first: 'Belmin', last: 'Bedak' }}]
            }).then(() => {
                let table = wrapper.find('.table')
                expect(table.html()).toContain('Belmin')
                done()
            })
        })        
    })

    it('display loading spinner if data is loading', () => {
        let wrapper = mount(HomeView)

        wrapper.setData({ isLoading: true })

        expect(wrapper.find('.loading').exists()).toBe(true)
    })

    it('display the message if response data is empty', () => {
        let wrapper = mount(HomeView)

        wrapper.setData({
            customers: [],
            isLoading: false
        })

        expect(wrapper.find('.empty').exists()).toBe(true)
    })

    it('push new customer to list', () => {
        let wrapper = registerStubbedWrapper()
        
        createBasicCustomer(wrapper, 'David')

        let table = wrapper.find('.table')
        expect(table.html()).toContain('David')
    })

    it('remove customer from the list', (done) => {
        let wrapper = registerStubbedWrapper()

        createBasicCustomer(wrapper, 'David')
        createBasicCustomer(wrapper, 'Alex')

        let deleteButton = wrapper.find('.table > tbody > tr:first-child > td:last-child .remove')
        deleteButton.trigger('click')

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200
            }).then(() => {
                let table = wrapper.find('.table')
                expect(table.html()).not.toContain('David')
                expect(table.html()).toContain('Alex')
                done()
            })
        })
    })

    // Helpers
    function registerStubbedWrapper() {
        let wrapper = mount(HomeView, {
            'registered-component': NewCustomerForm,
            stubs: {
                'router-link': RouterLinkStub
            }
        })
        wrapper.setData({ isLoading: false })
        return wrapper
    }

    function createBasicCustomer(wrapper, name) {
        wrapper.find(NewCustomerForm).vm.$emit('create', { name: { first: name } })
    }

})