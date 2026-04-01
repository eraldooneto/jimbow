import type { UUID } from "node:crypto";
import type { User } from "./User.ts";
import type { Priority } from "./Priority.js"

export interface Task {
    title: string;
    description?: string;
    storyPoints?: number;
    assignedTo: User | null;
    taskId: UUID;
    priority: Priority;
    creationDate: Date; 
}