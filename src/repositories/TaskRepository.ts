import type { UUID } from "node:crypto";
import type { Task } from "../types/Task.js"

class TaskRepository {
    private tasks: Task [] = []

    findAll(): Task[] {
        return this.tasks;
    }

    find(id: UUID, title?: string): Task | null {
        const task = this.tasks.find(t => t.taskId === id || t.title === title);
        return task ?? null;    
    }

    create(task: Task): Task {
        this.tasks.push(task)
        return task;
    }

    update(taskId: UUID, data: Partial<Task>): Task | null {
        const task = this.tasks.find(t => t.taskId === taskId);
        if (!task) return null;

        if (data.title) task.title = data.title;
        if (data.description) task.description = data.description;
        if (data.storyPoints) task.storyPoints = data.storyPoints;
        if (data.priority) task.priority = data.priority;
        if (data.assignedTo) task.assignedTo = data.assignedTo;

        return task;
    }

    delete(taskId: UUID, title?: string): boolean {
        const index = this.tasks.findIndex(t => t.taskId === taskId || t.title === title);
        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }

}

export const taskRepository = new TaskRepository(); 