<template>
    <div>
        <h2 class="title">Edit customer - {{ name.first }} {{ name.last }}</h2>
        <form @submit.prevent="update">
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <label>First name</label>
                            <input class="input first" type="text" placeholder="First name" v-model="form.name.first" required>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <label>Last name</label>
                            <input class="input last" type="text" placeholder="Last name" v-model="form.name.last" required>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <label>Birthday</label>
                            <datepicker name="birthday" format="dd MMMM yyyy" input-class="input birthday" v-model="form.birthday" placeholder="Birthday"></datepicker>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <label>Gender</label>
                            <div class="select is-fullwidth">
                                <select name="gender" v-model="form.gender" class="gender">
                                    <option value="m">Male</option>
                                    <option value="w">Female</option>
                                </select>
                            </div>
                        </p>
                    </div>
                    <div class="field">
                        <label>Lifetime value</label>
                        <p class="control is-expanded">
                            <input class="input liftime" type="number" placeholder="Customer lifetime value" step="any" v-model="form.customerLifetimeValue">
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-pulled-left">
                <p class="control">
                    <button class="button is-danger remove" type="button" @click="remove">
                        <span>Delete</span>
                    </button>
                </p>     
            </div>
            <div class="field has-addons is-pulled-right">
                <p class="control">
                    <button class="button cancel" type="button" @click="$router.push('/')">
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

    // Components
    import Datepicker from 'vuejs-datepicker'

    export default {

        name: 'CustomerView',

        components: { Datepicker },

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
                },
                name: {}
            }
        },

        mounted() {
            this.init()
        },

        watch: {
            '$route': 'init'
        },

        methods: {
            init() {
                if (this.$route.params.id) {
                    CustomerService.getSingle(this.$route.params.id)
                        .then(response => {
                            this.form = response.data
                            this.name = Object.assign({}, response.data.name)
                        })
                        .catch(err => console.error(err)) 
                }
            },
            update() {
                CustomerService.update(this.$route.params.id, this.form)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.error(err))
            },
            remove() {
                CustomerService.remove(this.$route.params.id)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.error(err))
            }
        }

    }

</script>

