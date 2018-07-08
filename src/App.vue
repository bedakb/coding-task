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
        transition-property: opacity;
        transition-duration: 0.5s;
    }
    .fade-enter-active {
        transition-delay: 0.5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>

