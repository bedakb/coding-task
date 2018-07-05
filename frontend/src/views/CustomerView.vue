<template>
    <div>
        <h2 class="title">Edit customer</h2>
        <form @submit.prevent="update">
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input first" type="text" placeholder="First name" v-model="form.name.first" required>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input last" type="text" placeholder="Last name" v-model="form.name.last" required>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input birthday" type="text" placeholder="Birthday" v-model="form.birthday">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <div class="select is-fullwidth">
                                <select name="gender" v-model="form.gender" class="gender">
                                    <option value="m">Male</option>
                                    <option value="w">Female</option>
                                </select>
                            </div>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input liftime" type="text" placeholder="Customer lifetime value" v-model="form.customerLifetimeValue">
                        </p>
                    </div>
                </div>
            </div>
            <div class="field has-addons is-pulled-right">
                <p class="control">
                    <button class="button cancel" type="button">
                        <span>Cancel</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button is-primary create" type="submit">
                        <span>Submit</span>
                    </button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>

    // Services
    import CustomerService from '@/services/CustomerService'

    export default {

        name: 'CustomerView',

        data() {
            return {
                form: {
                    name: {
                        first: '',
                        last: ''
                    },
                    birthday: '',
                    gender: '',
                    customerLifetimeValue: ''
                }
            }
        },

        created() {
            //this.init()
        },

        // watch: {
        //     '$route': 'init'
        // },

        methods: {
            init() {
                if (this.$route.params.id) {
                    CustomerService.getSingle(this.$route.params.id)
                        .then(response => this.form = response.data)
                        .catch(err => console.error(err)) 
                }
            }
        }

    }

</script>

