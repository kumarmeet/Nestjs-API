import { UserService } from './user.service';
declare type dto = {
    name: string;
    age: number;
};
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    addUser(dto: dto): Promise<void>;
    find(): Promise<import("./schema/user.schema").User[]>;
}
export {};
