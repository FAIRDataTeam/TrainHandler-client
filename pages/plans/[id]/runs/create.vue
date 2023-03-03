<script setup>
import { required } from '@vuelidate/validators'

definePageMeta({
    key: route => route.fullPath
})

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch(`/plans/${route.params.id}`)
const planId = route.params.id

const state = reactive({
    error: false
})

const form = {
    fields: [{
        name: 'displayName',
        label: 'Name',
        rules: { required },

    }, {
        name: 'note',
        label: 'Note',
        type: 'textarea',
        rules: {},
    }],
    submit: {
        label: 'Create'
    }
}

const submit = async (formData) => {
    try {
        const data = {
            ...formData,
            planUuid: planId,
            shouldStartAt: null
        }
        const res = await $api.post('/runs', data)
        await router.push(`/runs/${res.uuid}`)
    } catch (err) {
        console.log(err)
        state.error = true
    }
}

</script>

<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load plan details.">
        <PlansDetailHeader :title="data.displayName" active="runs" />
        <div class="mt-6 max-w-screen-md mx-auto">
            <h1>New run</h1>
            <AlertError v-if="state.error" text="Unable to create a new run." />
            <FormRenderer :form="form" @submit="submit" />
        </div>
    </PageWrapper>
</template>