<template>
    <div id="app">
        <section class="section">
            <div class="container">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>

    export default {

        name: 'App'

    }

</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.6s;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>

