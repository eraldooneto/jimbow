import type { User } from "../types/User.js";
import { userRepository } from "../repositories/UserRepository.js";
import { z } from "zod";

const emailSchema = z.email();
 
class UserService {

    private userSearch(email: string): User {
        const user = userRepository.findById(email);
        if (!user) throw new Error("User not found!");

        return user;
    }

    create(name: string, email: string): User {        
        if (!name) throw new Error("Name is required");
        emailSchema.parse(email);

        const exists = userRepository.findById(email); 
        
        if (exists) throw new Error("User already exists");
        
        const user: User = {
            name, 
            email,
            isActive: true
        }

        return userRepository.create(user);

    };

    findAll(): User[] {
        return userRepository.findAll();
    };

    findById(email: string): User {
        return this.userSearch(email);
    }; 

   update(email: string, data: Partial<User>): User {
        if(data.email) {
            const emailExists = userRepository.findById(data.email);
            
            if (emailExists) throw new Error("Email already in use");
            emailSchema.parse(data.email);
        }

        return userRepository.update(email, data)!;
    };

    delete(email: string): boolean {
        this.userSearch(email); 
        
        userRepository.delete(email);
        return true;
    };

}

export const userService = new UserService();