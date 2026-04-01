import type { UUID } from "node:crypto";
import type { Column } from "../types/Column.js";
import type { Task } from "../types/Task.js";


class ColumnRepository {

    private columns: Column[] = [];

    findAll(): Column[] {
        return this.columns; 
    }

    findById(id: UUID, name?: string): Column | null {
        const column = this.columns.find(c => c.id === id || c.title === name);
        return column ?? null;
    }

    create(column: Column): Column { 
        this.columns.push(column);
        return column;
    }

    update(id: UUID, newTitle: string): Column | null {
        const column = this.columns.find(c => c.id === id);
        if (!column) return null;

        column.title =  newTitle;
        return column;
    }

    delete(id: UUID): boolean {
        const index = this.columns.findIndex(c => c.id === id);
        if (index === -1) return false;

        this.columns.splice(index, 1);
        return true;
    }

    addTask(columnId: UUID, task: Task, columnTitle?: string): Task | null {
        const column = this.columns.find(c => c.id === columnId || c.title === columnTitle);
        if (!column) return null;

        column.tasks.push(task);
        return task;
    }

    removeTask(columnId: UUID, taskId: UUID): boolean {
        const column = this.columns.find(c => c.id === columnId);
        if (!column) return false;

        const taskIndex = column.tasks.findIndex(t => t.taskId === taskId);
        if (taskIndex === -1) return false;

        column.tasks.splice(taskIndex, 1);
        return true;

    }


}

export const columnRepository = new ColumnRepository();