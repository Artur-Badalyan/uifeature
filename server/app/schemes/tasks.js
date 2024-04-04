'use strict';

export const updateTask = {
    properties: {
        name: { type: 'string', maxLength: 255 },
        description: { type: ['string', 'null'], maxLength: 255 },
        status: { type: 'string', maxLength: 255 },
        estimatedDate: { type: ['string', 'null'], maxLength: 255 },
    },
    required: [],
    additionalProperties: false
};
export const createTask = {
    properties: {
        name: { type: 'string', maxLength: 255 },
        description: { type: 'string', maxLength: 255 },
        estimatedDate: { type: ['string', 'null'], maxLength: 255 },
        userId: { type: 'number', maxLength: 10 },
    },
    required: ['name'],
    additionalProperties: false
};
export const deleteTask = {
    properties: {
        taskId: { type: 'number', maxLength: 10 },
        // userId: { type: 'number', maxLength: 10 },
    },
    required: ['taskId'],
    additionalProperties: false
};

export default {
    updateTask,
    createTask,
    deleteTask
}