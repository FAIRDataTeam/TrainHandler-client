<script setup>
import _ from 'lodash'
import { required, url } from '@vuelidate/validators'

const router = useRouter()
const { $api } = useNuxtApp()

const { pending, data, error } = $api.lazyFetch('/train-types/all')

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
        label: 'Submit'
    }
})

watch(data, (newData) => {
    form.fields = form.fields.map((field) => {
        if (field.name === 'trainTypeUuids') {
            field.options = _.sortBy(newData.map(({ uuid, title }) => ({ key: uuid, value: title })), [])
        }
        return field
    })
})

const submit = async (data) => {
    try {
        const dataToSend = {...data}
        dataToSend.keywords = data.keywords.split('\n').filter((kw) => !_.isEmpty(kw))
        dataToSend.fetch = !!data.fetch
        dataToSend.trainTypeUuids = Object.entries(data.trainTypeUuids)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)

        const res = await $api.post('/trains', dataToSend)
        await router.push(`/trains/${res.uuid}`)
    } catch (err) {
        state.error = true
    }
}
</script>
<template>
    <div>
        <TrainsHeader active="trains" />
        <div class="mt-6 max-w-screen-md mx-auto">
            <h1>Add train</h1>
            <AlertError v-if="state.error" text="Unable to add the train." />
            <FormRenderer :form="form" @submit="submit" />
        </div>
    </div>
</template>