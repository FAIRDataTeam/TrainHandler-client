<script setup>
const route = useRoute()
const { $api, $timeUtils } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch(`/runs/${route.params.id}`)

const getDuration = (run) => $timeUtils.getDuration(run.startedAt, run.finishedAt)
</script>

<template>
    <RunsDetailWrapper :pending="pending" :error="error" :data="data">
        <div class="w-full border border-gray-200 rounded-lg flex justify-start items-start">
            <div class="px-6 py-3">
                <span class="block text-sm text-gray-500">Plan</span>
                <NuxtLink class="link font-semibold" :to="`/plans/${data.plan.uuid}`">{{ data.plan.displayName }}
                </NuxtLink>
            </div>
            <div class="px-6 py-3">
                <span class="block text-sm text-gray-500">Train</span>
                <NuxtLink class="link font-semibold" :to="`/trains/${data.plan.train.uuid}`">{{ data.plan.train.title }}
                </NuxtLink>
            </div>
            <div class="px-6 py-3">
                <span class="block text-sm text-gray-500">Status</span>
                <span class="font-semibold text-gray-600">{{ data.status }}</span>
            </div>
            <div class="px-6 py-3">
                <span class="block text-sm text-gray-500">Duration</span>
                <span class="font-semibold text-gray-600">{{ getDuration(data) }}</span>
            </div>
        </div>
        <div class="mt-10">
            <strong class="text-gray-500 mb-2">Jobs</strong>
            <div v-for="job in data.jobs" :key="job.uuid"
                class="bg-gray-100 rounded-lg px-6 py-3 mb-1 flex justify-between"
            >
                <span class="flex justify-start items-center">
                    <RunsStatusIcon :status="job.status" class="mr-1" />
                    <NuxtLink :to="`/runs/${data.uuid}/jobs/${job.uuid}`">{{ job.target.title }}</NuxtLink>
                </span>
                <span class="text-sm font-semibold text-gray-500 pl-2">{{ getDuration(job) }}</span>
            </div>
        </div>
    </RunsDetailWrapper>
</template>