<script setup>
const actions = [{
    label: 'Create plan',
    to: '/plans/create'
}]
</script>
<template>
    <PageHeader title="Plans" :actions="actions" />
</template>