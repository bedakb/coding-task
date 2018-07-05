<template>
    <div>
        <table class="table is-fullwidth">
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
    </div>
</template>

<script>

    import CustomerService from '@/services/CustomerService'

    export default {
    
        name: 'HomeView',

        data() {
            return {
                customers: []
            }
        },

        mounted() {
            this.init()
        },

        methods: {
            init() {
                CustomerService.get()
                    .then(response => this.customers = response.data)
                    .catch(err => console.error(err))
            }
        }

    }

</script>

