import type { Task } from "./Task.js";
import type { UUID } from "node:crypto";

export interface Column {
    title: string;
    tasks: Task [];
    id: UUID;
}