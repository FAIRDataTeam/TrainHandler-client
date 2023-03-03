<script setup>
import { required, url } from '@vuelidate/validators'

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const form = {
    fields: [{
        name: 'displayName',
        label: 'Name',
        rules: { required },
    }, {
        name: 'uri',
        label: 'URI',
        rules: { required, url },
    }, {
        name: 'note',
        label: 'Note',
        type: 'textarea',
        rules: {},
    }],
    submit: {
        label: 'Save'
    }
}

const { pending, error, data } = $api.lazyFetchForm(`/station-directories/${route.params.id}`, form.fields, (newFields) => {
    form.fields = newFields
})

const state = reactive({
    error: false
})

const submit = async (data) => {
    try {
        const res = await $api.put(`/station-directories/${route.params.id}`, data)
        await router.push(`/station-directories/${res.uuid}`)
    } catch (err) {
        state.error = true
    }
}
</script>
<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load station directory details.">
        <StationsDirectoryDetailHeader :title="data.displayName" hideActions="true" />
        <div class="max-w-screen-md mx-auto">
            <AlertError v-if="state.error" text="Unable to update the station directory." />
            <FormRenderer :form="form" @submit="submit" />

        </div>
    </PageWrapper>
</template>
