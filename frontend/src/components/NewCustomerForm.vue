<template>
    <div>
        <button class="button add is-primary is-pulled-right" @click="isVisible = true">
            <span class="icon">
                <i class="fa fa-plus"></i>
            </span>
            <span>Create customer</span>
        </button>
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
            <button type="submit" class="button is-primary is-pulled-right create">Submit</button>
        </form>
    </div>
</template>

<script>

    // Services
    import CustomerService from '@/services/CustomerService'

    export default {

        name: 'NewCustomerForm',

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
                        e.target.reset()
                    })
                    .catch(err => console.error(err))
            }
        }

    }

</script>

