<script setup>
const route = useRoute()
const { $api, $timeUtils } = useNuxtApp()

const { pending: runPending, data: runData, error: runError } = $api.lazyFetch(`/runs/${route.params.id}`)
const { pending: jobPending, data: jobData, error: jobError } = $api.lazyFetch(`/runs/${route.params.id}/jobs/${route.params.jobId}`)

const getDuration = (job) => $timeUtils.getDuration(job.startedAt, job.finishedAt)

const getEvents = (job) => {
    let startTime = job.startedAt

    return job.events.map(event => {
        event.duration = $timeUtils.getDuration(startTime, event.occurredAt)
        startTime = event.occurredAt
        return event
    })
}
</script>

<template>
    <RunsDetailWrapper :pending="runPending || jobPending" :error="runError || jobError" :data="runData">
        <div class="w-full border border-gray-200 rounded-lg flex justify-start items-start">
            <div class="px-6 py-3">
                <span class="block text-sm text-gray-500">Station</span>
                <NuxtLink class="link font-semibold" :to="`/stations/${jobData.target.uuid}`">{{ jobData.target.title }}
                </NuxtLink>
            </div>
            <div class="px-6 py-3">
                <span class="block text-sm text-gray-500">Status</span>
                <span class="font-semibold text-gray-600">{{ jobData.status }}</span>
            </div>
            <div class="px-6 py-3">
                <span class="block text-sm text-gray-500">Duration</span>
                <span class="font-semibold text-gray-600">{{ getDuration(jobData) }}</span>
            </div>
        </div>
        <div class="mt-10">
            <strong class="block text-gray-500 mb-5">Events</strong>
            <AlertInfo v-if="jobData.events.length === 0" text="There are no events for this job." />
            <div v-for="event in getEvents(jobData)" :key="event.uuid"
                class="bg-gray-100 rounded-lg px-6 py-3 mb-1 flex justify-between"
            >
                <span>{{ event.message }}</span>
                <span class="text-sm font-semibold text-gray-500 pl-2">{{ event.duration }}</span>
            </div>
        </div>
    </RunsDetailWrapper>
</template>