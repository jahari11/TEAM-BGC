export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: 'message',
            title: 'Banner Message',
            type: 'string',
        },
        {
            name: 'showBanner',
            title: 'Show Banner',
            type: 'boolean',
            intialValue: true,
        },
    ],
}