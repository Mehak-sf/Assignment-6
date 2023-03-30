import {Request,Response} from 'express';
import fs from 'fs/promises';
import {User} from '../public/user';
//import {path} from 'path';
class controller {

    public async getAll(req:Request, res:Response) {
        const users = await fs.readFile('./src/data/users.json',{encoding:'utf-8'});
        res.status(200).send(JSON.parse(users)); 

       
    }

    public async getUserById(req: Request, res: Response) {
        const data = await fs.readFile('./src/data/users.json', 'utf-8');
        const id = req.params.id;
        const users = JSON.parse(data) as User[];
        const index = users.findIndex((user)=> user.id === Number(id));
        
       
        if(index>=0)
        {
            const singleUser = users[index];
            res.status(200).send(singleUser);
            return;
        }
        else{
            res.status(400).send("You have entered wrong id");
            return;
        } 
    }
    public async updateUser(req: Request, res: Response) {
        const data = await fs.readFile('./src/data/users.json', 'utf-8');
        const users = JSON.parse(data) as User[];

        const index = users.findIndex((user)=> user.id === Number(req.params.id));
        const inputUser = req.body as User;
       
        inputUser.id = Number(req.params.id);
        if(index>=0)
        {
            users[index].firstName = inputUser.firstName || users[index].firstName;
            users[index].middleName = inputUser.middleName || users[index].middleName;
            users[index].lastName = inputUser.lastName || users[index].lastName;
            users[index].email = inputUser.email || users[index].email;
            users[index].phone = inputUser.phone || users[index].phone;
            users[index].address = inputUser.address || users[index].address;
            users[index].role = inputUser.role || users[index].role; 
            fs.writeFile('./src/data/users.json',JSON.stringify(users));
            res.status(200).send("User Updated");
            
        }
        else{
            res.status(400).send("Incorrect ID");
        
        }
    }
    public async deleteUser(req: Request, res: Response) {
        const data = await fs.readFile('./src/data/users.json','utf-8');
        
        const users = JSON.parse(data) as User[];
        const id = Number(req.params.id);
        const index = users.findIndex((user)=> user.id === id);
        users.splice(index,1);
        fs.writeFile('./src/data/users.json',JSON.stringify(users));
        res.status(200).send("Done");
     
    }
  
}

export const userController = new controller();
