<script lang="ts" setup>
import '@/assets/tailwind.scss'
</script>

<template>
    <div class="pt-24">
        <Header />
        <NuxtPage class="container mx-auto px-4" />
    </div>
</template>

<style lang="scss">
h1 {
    @apply text-3xl;
}

.link {
    @apply text-cyan-600;
    @apply hover:text-cyan-500;
}

.button {
    @apply inline-flex;
    @apply justify-center;
    @apply items-center;
    @apply rounded-lg;
    @apply border;
    @apply shadow-sm;
    @apply px-4;
    @apply py-2;
    @apply text-base;
    @apply font-medium;
    @apply focus:outline-none;
    @apply focus:ring-2;
    @apply focus:ring-offset-2;
    @apply cursor-pointer;

    &-sm {
        @apply text-sm;
    }

    &-primary {
        @apply border-transparent;
        @apply bg-cyan-600;
        @apply text-white;
        @apply hover:bg-cyan-700;
        @apply focus:ring-cyan-500;
    }

    &-danger {
        @apply border-transparent;
        @apply bg-red-600;
        @apply text-white;
        @apply hover:bg-red-700;
        @apply focus:ring-red-500;
    }

    &-outline-default {
        @apply border-gray-200;
        @apply bg-white;
        @apply text-gray-700;
        @apply hover:bg-gray-50;
        @apply focus:ring-cyan-500;
    }

    &-outline-danger {
        @apply border-gray-200;
        @apply bg-white;
        @apply text-red-700;
        @apply hover:bg-gray-50;
        @apply focus:ring-red-500;
    }
}
</style>