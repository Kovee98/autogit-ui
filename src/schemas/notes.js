export default {
    title: "note schema",
    version: 0,
    description: "describes an notella note",
    primaryKey: "id",
    type: "object",
    properties: {
        id: {
            type: "string"
        },
        title: {
            type: "string"
        },
        body: {
            type: "string"
        },
        tags: {
            type: "array",
            uniqueItems: true,
            items: {
                type: "string"
            }
        }
    },
    required: [
        "id",
        "title",
    ],
    encrypted: [ "title", "body", "tags" ],
    attachments: {
        encrypted: true
    }
};