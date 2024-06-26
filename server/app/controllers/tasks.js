import { scheduleJob } from 'node-schedule';
import { couldNotGet, couldNotAdd, couldNotUpdate } from '#app/helpers/errorResponseBodyBuilder.js';
import { isSchemeValidSync } from '#app/helpers/validate.js';
import { tasks as tasksValidator } from '#app/schemes/index.js';
import CONSTANTS from '#app/constants/Constants.js';
// const notificationService = require('services/notificationService');
import models from '#app/models/index.js';
const { users: Users, tasks: Tasks, sequelize } = models;
import { getListPayload } from './common.js';

export async function getAllTasks(req, res) {
    try {
        let payload = getListPayload(req);
        payload.include = [{ model: Users }];
        console.log('\n\n\n payload = ',payload)
        const { count, rows } = await Tasks.findAndCountAll(payload);
        return res.json({ count: count, data: rows });
    } catch(err) {
        return res
            .status(500)
            .json(couldNotGet(CONSTANTS.TypeNames.TASKS.toLowerCase()));
    }
}

export async function getTasks(req, res) {
    try {
        let payload = getListPayload(req);
        payload.include = [{ model: Users, where: { id: req.user.id } }];
        const { count, rows } = await Tasks.findAndCountAll(payload);
        return res.json({ count: count, data: rows });
    } catch(err) {
        return res
            .status(500)
            .json(couldNotGet(CONSTANTS.TypeNames.TASKS.toLowerCase()));
    }
}

export async function getTask(req, res) {
    try {
        const task = await Tasks.findPk(req.params.id);
        return res.json(task);
    } catch {
        return res
        .status(500)
        .json(couldNotGet(CONSTANTS.TypeNames.TASK.toLowerCase()));
    }
}

export async function create(req, res) {
    let transaction;
    try {
        const payload = { ...req.body, userId: req.user.id };
        const { isValid, errors, data: taskData } = isSchemeValidSync(tasksValidator.createTask, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        transaction = await sequelize.transaction();
        const createdTask = await Tasks.create(taskData, { transaction });
        const user = await Users.findByPk(req.user.id);
        const firebaseToken = user.firebaseToken;
        const messagePayload = {
            title: `Created Todo.`,
            body: ` Hi ${user.firstName || user.nickName}. Created new todo.\n { ID: ${createdTask.id}, NAME: ${createdTask.name} }`
        };
        await transaction.commit();
        // notificationService.sendFCMNotification(messagePayload.title, messagePayload.body, firebaseToken, req.user.id);
        return res.status(200).json({ task: createdTask, message: 'Task has been created.' });
    } catch(err) {
        if (transaction) {
            transaction.rollback();
        }
        return res
            .status(500)
            .json(couldNotAdd(CONSTANTS.TypeNames.TASK.toLowerCase()));
    }
}

export async function update(req, res) {
    try {
        const payload = { ...req.body };
        const { isValid, errors, data: taskData } = isSchemeValidSync(tasksValidator.updateTask, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        const apiPayload = { where: { id: req.params.id } };
        const result = await Tasks.update(taskData, apiPayload);
        if (!result[0]) {
            return res.status(400).json({ message: 'Task not found' });
        }
        const updatedTask = await Tasks.findByPk(req.params.id);
        return res.json({ task: updatedTask, message: 'Task has been updated.' });
    } catch(err) {
        return res
            .status(500)
            .json(couldNotUpdate(CONSTANTS.TypeNames.TASK.toLowerCase()));
    }
}

const _delete = async (req, res) => {
    try {
        const payload = { taskId: req.params.id };
        const { isValid, errors } = isSchemeValidSync(tasksValidator.deleteTask, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        const result = await Tasks.destroy({ where: { id: req.params.id } });
        if (!result) {
            return res.status(400).json({ message: 'Task not found' });
        }
        return res.json({ message: 'Task has been deleted.' });
    } catch (err) {
        return res.status(500).json({ message: 'Error to delete new task.' });
    }
};
export { _delete as delete };

const getTokenAndSendNotification = async (req) => {
    const userId = req.user.id;
    const firebaseToken = (await Users.findByPk(userId)).firebaseToken;
    if (firebaseToken) {
        const messagePayload = {
            title: `Reminder`,
            body: ` Hi ${req.user.firstName || req.user.nickName}. You set up a reminder for a task {ID: ${req.params.id}}.`
        };
        // notificationService.sendFCMNotification(messagePayload.title, messagePayload.body, firebaseToken, req.user.id);
    }
}

export async function scheduleReminder(req, res) {
    try {
        const { reminderDate } = req.body;
        const date = new Date(reminderDate);
        scheduleJob(date, () => getTokenAndSendNotification(req));
        return res.json({ message: 'Successfully scheduled reminder.' });
    } catch(err) {
        return res.status(500).json({ message: 'Error to schedule reminder for a task.' });
    }
}

export default {
    getAllTasks,
    getTasks,
    getTask,
    delete: _delete,
    scheduleReminder
}