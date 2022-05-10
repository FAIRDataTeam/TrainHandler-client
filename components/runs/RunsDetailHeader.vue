<script setup>
const props = defineProps(['run'])
</script>
<template>
    <PageHeader :wide="true">
        <div class="mt-2 flex justify-start items-center">
            <RunsStatusIcon :status="run.status" large="true" />
            <h1 class="ml-2">{{ run.displayName }}</h1>
        </div>
    </PageHeader>
</template>