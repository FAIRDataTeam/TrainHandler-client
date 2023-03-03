<script setup>
import _ from 'lodash'
import { required, url } from '@vuelidate/validators'

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const state = reactive({
    error: false
})

const form = reactive({
    fields: [{
        name: 'title',
        label: 'Title',
        rules: { required },
    }, {
        name: 'description',
        label: 'Description',
        rules: {},
    }, {
        name: 'uri',
        label: 'URI',
        rules: { required, url },
    }, {
        name: 'keywords',
        label: 'Keywords',
        rules: {},
        type: 'textarea',
    }, {
        name: 'metadata',
        label: 'Metadata',
        rules: {},
        type: 'textarea',
    }, {
        name: 'endpointUrl',
        label: 'Endpoint URL',
        rules: { required, url },
    }, {
        name: 'endpointDescription',
        label: 'Endpoint Description',
        rules: {},
    }, {
        name: 'trainTypeUuids',
        label: 'Train Types',
        type: 'multichoice',
        rules: {},
        options: [],
    }, {
        name: 'fetch',
        label: 'Fetch',
        type: 'checkbox',
        rules: {},
    }],
    submit: {
        label: 'Save'
    }
})


// Get train types and set the options to the form
const { data: typesData } = $api.lazyFetch('/train-types/all')
watch(typesData, (newData) => {
    form.fields = form.fields.map((field) => {
        if (field.name === 'trainTypeUuids') {
            field.options = _.sortBy(newData.map(({ uuid, title }) => ({ key: uuid, value: title })), [])
        }
        return field
    })
})

// Get the values for edit
const { pending, data, error } = $api.lazyFetchForm(`/stations/${route.params.id}`, form.fields, (newFields) => {
    form.fields = newFields.map((field) => {
        if (field.name === 'keywords') {
            field.value = field.value.join('\n')
        }
        return field
    })
})

// Update the train types values after we get the data
watch(data, (newData) => {
    console.log('newData', newData)
    form.fields = form.fields.map((field) => {
        if (field.name === 'trainTypeUuids') {
            field.value = newData.types.reduce((acc, { uuid }) => {
                return { ...acc, [uuid]: true }
            }, {})
            console.log('field value', field.value)
        }
        return field
    })
})

const submit = async (data) => {
    try {
        const dataToSend = {...data}
        dataToSend.keywords = data.keywords.split('\n').filter((kw) => !_.isEmpty(kw))
        dataToSend.softDeleted = false
        dataToSend.fetch = !!data.fetch
        dataToSend.trainTypeUuids = Object.entries(data.trainTypeUuids)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)

        const res = await $api.put(`/stations/${route.params.id}`, dataToSend)
        await router.push(`/stations/${res.uuid}`)
    } catch (err) {
        state.error = true
    }
}
</script>
<template>
    <PageWrapper :pending="pending" :error="error" errorText="Unable to load station details.">
        <TrainsGarageDetailHeader :title="data.title" hideActions="true" />
        <div class="max-w-screen-md mx-auto">
            <AlertError v-if="state.error" text="Unable to update the station." />
            <FormRenderer :form="form" @submit="submit" />
        </div>
    </PageWrapper>
</template>
