import type { Task } from "./Task.js";

export interface Column {
    title: string;
    tasks: Task [];
}