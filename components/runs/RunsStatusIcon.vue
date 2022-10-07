<script setup>
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon, HomeIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['status', 'large'])
</script>

<template>
    <span>
        <ClockIcon v-if="status === 'PREPARED' || status === 'QUEUED' || status === 'SCHEDULED'"
            class="flex-none text-gray-500" :class="large ? 'w-7 h-7' : 'w-5 h-5'" />
        <svg v-else-if="status === 'RUNNING' || status === 'ABORTING'" class="animate-spin text-yellow-700"
            :class="large ? 'w-7 h-7' : 'w-5 h-5'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        <CheckCircleIcon v-else-if="status === 'FINISHED'" class="flex-none text-green-700"
            :class="large ? 'w-7 h-7' : 'w-5 h-5'" />
        <MinusCircleIcon v-else-if="status === 'ABORTED'" class="flex-none text-gray-500"
            :class="large ? 'w-7 h-7' : 'w-5 h-5'" />
        <XCircleIcon v-else-if="status === 'ERRORED'" class="flex-none text-red-700"
            :class="large ? 'w-7 h-7' : 'w-5 h-5'" />
        <ExclamationCircleIcon v-else-if="status === 'FAILED'" class="flex-none text-red-700"
            :class="large ? 'w-7 h-7' : 'w-5 h-5'" />
        <HomeIcon v-else class="flex-none" :class="large ? 'w-7 h-7' : 'w-5 h-5'" />
    </span>
</template>