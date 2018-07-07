<template>
    <div>
        <!-- Basic form controls -->
        <div class="columns">
            <div class="column is-12">
                <button 
                    class="button add is-primary is-pulled-right" 
                    v-show="!isVisible"
                    @click="isVisible = true"
                >
                    <span class="icon">
                        <i class="fa fa-plus"></i>
                    </span>
                    <span>Create customer</span>
                </button>
                <a 
                    class="delete is-pulled-right close" 
                    v-show="isVisible" 
                    @click="isVisible = false"
                ></a>
            </div>
        </div>
        <!-- Actual form wrapper -->
        <div class="columns">
            <div class="column is-12">
                <form v-show="isVisible" @submit.prevent="create">
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
                                    <datepicker name="birthday" format="dd MMMM yyyy" input-class="input birthday" v-model="form.birthday" placeholder="Birthday"></datepicker>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <div class="select is-fullwidth">
                                        <select name="gender" v-model="form.gender" class="gender">
                                            <option value="" disabled selected hidden>Gender</option>
                                            <option value="m">Male</option>
                                            <option value="w">Female</option>
                                        </select>
                                    </div>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input liftime" type="number" placeholder="Customer lifetime value" step="any" v-model="form.customerLifetimeValue">
                                </p>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="button is-primary is-pulled-right create">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    // Services
    import CustomerService from '@/services/CustomerService'
    
    // Components
    import Datepicker from 'vuejs-datepicker'

    // Helpers
    import { resetForm } from '@/helpers'

    export default {

        name: 'NewCustomerForm',

        components: { Datepicker },

        data() {
            return {
                isVisible: false,
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
        
        methods: {
            create(e) {
                CustomerService.create(this.form)
                    .then(response => {
                        this.$emit('create', response.data)
                        resetForm(this.form)
                    })
                    .catch(err => console.error(err))
            }
        }

    }

</script>

