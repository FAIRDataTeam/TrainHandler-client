<script setup>
const props = defineProps(['visible'])
</script>
<template>
    <div>
        <div v-if="props.visible" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div
                    class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transform-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>