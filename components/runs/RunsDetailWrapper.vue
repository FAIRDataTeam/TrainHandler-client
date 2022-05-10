<script setup>
const route = useRoute()
const props = defineProps(['pending', 'error', 'data'])
const activeJobId = route.params.jobId
</script>

<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load run details.">
        <RunsDetailHeader :run="data" />
        <div>
            <div class="fixed top-[8rem] left-0 bottom-0 w-[20rem] overflow-y-auto">
                <div class="px-3 py-6">
                    <RunsDetailNavLink :to="`/runs/${data.uuid}`" :active="!activeJobId">Summary</RunsDetailNavLink>
                    <strong class="block text-sm text-gray-500 mt-6 px-3">Jobs</strong>
                    <ul>
                        <li v-for="job in data.jobs" :key="job.uuid">
                            <RunsDetailNavLink :to="`/runs/${data.uuid}/jobs/${job.uuid}`"
                                :active="activeJobId === job.uuid" :status="job.status">
                                {{ job.target.title }}
                            </RunsDetailNavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pl-[20rem] h-[calc(100vh-8rem)] overflow-y-auto">
                <div class="p-6">
                    <slot></slot>
                </div>
            </div>
        </div>
    </PageWrapper>
</template>