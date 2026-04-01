import type { User } from "../types/User.js"; 

class UserRepository {
    private users: User[] = [];

    findAll(): User[] {
        return this.users;
    }

    findById(email: string): User | null {
        const user = this.users.find(u => u.email === email); 
        return user ?? null;
    }

    create(user: User): User {
        this.users.push(user);
        return user;
    }

    update(email: string, data: Partial<User>): User | null {
        const user = this.users.find(u => u.email === email);
        if (!user) return null;

        if (data.name) user.name = data.name;
        if (data.email) user.email = data.email;
        if (data.isActive) user.isActive = data.isActive;

        return user;
    }

    delete(email: string): boolean {
        const index = this.users.findIndex(u => u.email === email)
        if (index === -1) return false;

        this.users.splice(index, 1)
        return true
    }

}

export const userRepository = new UserRepository();