import { randomUUID, type UUID } from "node:crypto";
import type { Task } from "../types/Task.js";
import type { User } from "../types/User.js";
import type { Priority } from "../types/Priority.js";
import { taskRepository } from "../repositories/TaskRepository.js";


class TaskService {

    private findTask(taskTitle: string): Task {
        const task = taskRepository.findAll().find(t => t.title === taskTitle);

        if (!task) throw new Error("Task not found.");

        return task;
    }

    create(title: string,
        priority: Priority,   
        assignedTo: User | null,
        description?: string,
        storyPoints?: number): Task {

            const exists = taskRepository.findAll().find(t => t.title === title);
            if (exists) throw new Error("Task already exists.")
            
            const task: Task = {
                title,
                taskId: randomUUID(),
                assignedTo,
                description,
                storyPoints,
                priority,
                creationDate: new Date()
            }

            return taskRepository.create(task);

        };

}

export const taskService = new TaskService();