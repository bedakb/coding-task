<template>
    <div>
        <!-- New customer form -->
        <new-customer-form
            @create="add"
        >
        </new-customer-form>

        <!-- List all customers and store them in the table -->
        <table class="table is-fullwidth" v-if="!isLoading">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Birthday</th>
                    <th>Gender</th>
                    <th>Last contact</th>
                    <th>Customer lifetime</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, $index) in customers" :key="item._id">
                    <td>{{ item.name.first }}</td>
                    <td>{{ item.name.last }}</td>
                    <td>{{ item.birthday }}</td>
                    <td>
                        <span v-show="item.gender === 'w'">
                            <i class="fa fa-female"></i>
                        </span>
                        <span v-show="item.gender === 'm'">
                            <i class="fa fa-male"></i>
                        </span>
                    </td>
                    <td>{{ item.lastContact }}</td>
                    <td>{{ item.customerLifetimeValue }}</td>
                    <td>
                        <button class="button is-danger is-small">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="loading has-text-centered" v-if="isLoading">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>

    // Services
    import CustomerService from '@/services/CustomerService'

    // Components
    import NewCustomerForm from '@/components/NewCustomerForm'

    export default {
    
        name: 'HomeView',

        components: { NewCustomerForm },

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
                this.customers.push(data)
            }
        }

    }

</script>

