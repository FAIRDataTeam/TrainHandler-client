<script setup>
const props = defineProps([
    'visible',
    'dangerous',
    'title',
    'confirmAction',
    'cancelAction',
])

const emit = defineEmits([
    'confirm',
    'cancel',
])


</script>
<template>
    <Modal :visible="visible">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
            <p class="text-sm text-gray-500 mt-2">
                <slot></slot>
            </p>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
                @click="emit('confirm')"
                type="button"
                class="button button-danger w-full sm:ml-3 sm:w-auto"
            >{{ confirmAction }}</button>
            <button
                @click="emit('cancel')"
                type="button"
                class="button button-outline-default mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
            >{{ cancelAction }}</button>
        </div>
    </Modal>
</template>