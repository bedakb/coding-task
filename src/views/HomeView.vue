<template>
    <div>
        <!-- New customer form -->
        <new-customer-form
            @create="add"
        >
        </new-customer-form>

        <div class="empty has-text-centered" v-if="!isLoading && !customers.length">
            <p>There are no data found.</p>
        </div>
        <!-- List all customers and store them in the table -->
        <div class="table-wrapper">
            <table class="table is-fullwidth is-striped" v-if="!isLoading && customers.length">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Birthday</th>
                        <th class="has-text-centered">Gender</th>
                        <th>Last contact</th>
                        <th class="has-text-right">Customer lifetime</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, $index) in customers" :key="item._id">
                        <td>{{ item.name.first }}</td>
                        <td>{{ item.name.last }}</td>
                        <td>{{ item.birthday | formatDate }}</td>
                        <td class="has-text-centered">
                            <span v-show="item.gender === 'w'">
                                <i class="fa fa-female"></i>
                            </span>
                            <span v-show="item.gender === 'm'">
                                <i class="fa fa-male"></i>
                            </span>
                        </td>
                        <td>{{ item.lastContact | formatDate }}</td>
                        <td class="has-text-right">{{ item.customerLifetimeValue }}</td>
                        <td class="has-text-right">
                            <router-link :to="{ name: 'Customer', params: { id: item._id } }" tag="button" class="button is-small">
                                <i class="fa fa-pencil"></i>
                            </router-link>
                            <button class="button is-danger is-small remove" @click="remove($index, item._id)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="loading has-text-centered" v-if="isLoading">
            <i class="fa fa-spinner fa-spin"></i>
        </div>
    </div>
</template>

<script>

    // Services
    import CustomerService from '@/services/CustomerService'

    // Components
    import NewCustomerForm from '@/components/NewCustomerForm'

    // Filters
    import { formatDate } from '@/filters'

    export default {
    
        name: 'HomeView',

        components: { NewCustomerForm },

        filters: { formatDate },

        data() {
            return {
                customers: [],
                isLoading: true
            }
        },

        mounted() {
            this.init()
        },

        methods: {
            init() {
                CustomerService.get()
                    .then(response => {
                        this.isLoading = false
                        this.customers = response.data
                    })
                    .catch(err => console.error(err))
            },
            add(data) {
                this.customers.unshift(data)
            },
            remove(index, id) {
                CustomerService.remove(id)
                    .then(response => this.customers.splice(index, 1))
                    .catch(error => console.error(error))
            }
        }

    }

</script>

<style>
    .loading i {
        font-size: 30px;
    }
    .table-wrapper {
        overflow-x: auto;
    }
</style>
