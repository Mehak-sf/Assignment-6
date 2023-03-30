var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
//import {path} from 'path';
class controller {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield fs.readFile('./src/data/users.json', { encoding: 'utf-8' });
            res.status(200).send(JSON.parse(users));
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs.readFile('./src/data/users.json', 'utf-8');
            const id = req.params.id;
            const users = JSON.parse(data);
            const index = users.findIndex((user) => user.id === Number(id));
            if (index >= 0) {
                const singleUser = users[index];
                res.status(200).send(singleUser);
                return;
            }
            else {
                res.status(400).send("You have entered wrong id");
                return;
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield fs.readFile('./src/data/users.json', 'utf-8');
            const newUser = req.body;
            const data = JSON.parse(users);
            newUser.id = data[data.length - 1].id + 1;
            const newUsers = data.concat(newUser);
            yield fs.writeFile('./src/data/users.json', JSON.stringify(newUsers));
            res.status(201).send("User added successfully!");
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs.readFile('./src/data/users.json', 'utf-8');
            const users = JSON.parse(data);
            const index = users.findIndex((user) => user.id === Number(req.params.id));
            const inputUser = req.body;
            inputUser.id = Number(req.params.id);
            if (index >= 0) {
                users[index].firstName = inputUser.firstName || users[index].firstName;
                users[index].middleName = inputUser.middleName || users[index].middleName;
                users[index].lastName = inputUser.lastName || users[index].lastName;
                users[index].email = inputUser.email || users[index].email;
                users[index].phone = inputUser.phone || users[index].phone;
                users[index].address = inputUser.address || users[index].address;
                users[index].role = inputUser.role || users[index].role;
                fs.writeFile('./src/data/users.json', JSON.stringify(users));
                res.status(200).send("Updated");
            }
            else {
                res.status(400).send("id provided by you doesn't exist");
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs.readFile('./src/data/users.json', 'utf-8');
            const users = JSON.parse(data);
            const id = Number(req.params.id);
            const index = users.findIndex((user) => user.id === id);
            users.splice(index, 1);
            fs.writeFile('./src/data/users.json', JSON.stringify(users));
            res.status(200).send("Done");
        });
    }
}
export const userController = new controller();
//# sourceMappingURL=controller.js.map