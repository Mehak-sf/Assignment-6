import {CRUD} from "./crudInterface.js"; 
import { User,Role } from "./user.js";
import { findIndexByID } from "./findOperations.js";
export class UserCRUD implements CRUD <User> 
{
    users: User[];
    col: string[];
    tableContainer: HTMLDivElement;
    tableEle : HTMLTableElement;
    myURL : string;
  
    addContainer : HTMLDivElement;

    constructor()
    {
       this.users = [];
       this.col = [];
       this.tableContainer = document.querySelector('.table')!;
       this.myURL = `http://localhost:2500`;
       this.tableEle = document.createElement("table");
       this.addContainer = document.querySelector('.AddContainer');
       this.initialize();
    }
  
     async initialize()
    {       
        const response = await fetch(this.myURL + '/users');
        const data = await response.json();
        for (let key in data[0]) {
            if(this.col.indexOf(key) < 0 && (key !== "id"))
            {
                this.col.push(key); 
            }
        }

        data.forEach((ob:any) => 
            {
                this.users.push(new User(ob.id,ob.firstName, ob.middleName, ob.lastName, ob.email, ob.phone, ob.role, ob.address));
            }
        )
    }

    load()
    {
        this.tableEle =  document.createElement("table");
        let tr = this.tableEle.insertRow(-1);
    
        for(let i=0; i< this.col.length;i++)
        {   
            let th = tr.insertCell(i);
            
            th.innerHTML = this.col[i];
            
        }
        this.users.forEach((user) => this.loadTableContent(user))
    
    }
    loadTableContent(user: User)
    {
       let tr = document.createElement("tr");
       let editBtn = document.createElement("button");
       editBtn.innerHTML = "Edit";
       editBtn.addEventListener('click',() => this.update(user));
       editBtn.setAttribute('class','edit');
       let deleteBtn = document.createElement("button");
       deleteBtn = document.createElement("button");
       deleteBtn.innerHTML = "Delete";
       deleteBtn.addEventListener('click',()=>this.delete(user));
       deleteBtn.classList.add("dlt");
    
        tr.innerHTML = `<td id = "fname">${user.firstName}</td>
                        <td id = "middle">${user.middleName}</td>
                        <td id = "last">${user.lastName}</td>
                        <td id = "email">${user.email}</td>
                        <td id = "phone">${user.phone}</td>
                        <td id = "role-cell">${user.role}</td>
                        <td id = "address">${user.address}</td>
                        `;
        tr.append(editBtn);
        tr.append(deleteBtn);
        this.tableEle.append(tr);
        this.tableContainer.innerHTML = "";
        this.tableContainer.append(this.tableEle);
       
    }

    addUser()
    {
       

    }

    async  create(user:User)
    {
        
            this.load();

    }

     read(): User[] {
        return this.users;
    }

    async update(user:User)
    {
        let index = findIndexByID(user.id,this.users);
        let tr = this.tableEle.children[index+1] as HTMLTableRowElement;
        let editbtn = tr.children[tr.children.length-2] as HTMLButtonElement;
        let dltbtn = tr.children[tr.children.length-1] as HTMLButtonElement;
        let cell = tr.cells.namedItem("role-cell");
    
        if(editbtn.innerHTML === "Edit")
        {
            tr.contentEditable = "true";
            editbtn.innerHTML = "Save";
            dltbtn.innerHTML = "Cancel";
            editbtn.contentEditable = "false";
            dltbtn.contentEditable = "false";
            let select = document.createElement("select") as HTMLSelectElement;   
            select.classList.add("select");
            select.setAttribute('id','select');
            for (const i in Role) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
    
                if (cell.textContent === i) 
                {
                    option.selected = true;
                }
                else option.selected = false;
                select.appendChild(option);
            }    
            cell.replaceWith(select);
        }
        else{
           this.save(user);
        }
    }

    async save(user:User)
    {
        let index = findIndexByID(user.id,this.users);
        let tr = this.tableEle.children[index+1] as HTMLTableRowElement;
        let editbtn = tr.children[tr.children.length-2] as HTMLButtonElement;
        let dltbtn = tr.children[tr.children.length-1] as HTMLButtonElement; 
        let fnameCell = tr.cells.namedItem("fname");
        let middlenameCell = tr.cells.namedItem("middle");
        let lastnameCell = tr.cells.namedItem("last");
        let emailCell = tr.cells.namedItem("email");
        let phoneCell = tr.cells.namedItem("phone");
        let addressCell = tr.cells.namedItem("address");
        let selectCell = tr.cells.namedItem("select");

        tr.contentEditable = "false";
        editbtn.innerHTML = "Edit";
        dltbtn.innerHTML = "Delete";
        const updateURL = this.myURL + '/update/' + `${user.id}`;
            
        user.firstName = fnameCell.textContent !;
        user.middleName = middlenameCell.textContent !;
        user.lastName = lastnameCell.textContent !;
        user.email = emailCell.textContent !;
        user.phone = phoneCell.textContent !;         
        user.address = addressCell.textContent !;
        for(let i = 0; i<= 2;i++)
        {
           let s = tr.children[5].children[i] as HTMLOptionElement;
        
            if(s.selected)
                {
                    user.role = s.textContent!;
                }
        } 
        let td = document.createElement("td");
        td.setAttribute('id','role-cell');
        tr.children[5].replaceWith(td);
        let roleCell = tr.cells.namedItem('role-cell');
        roleCell.innerHTML = user.role;

        const mybody = {
                "id": user.id,
                "firstName": user.firstName,
                "middleName": user.middleName,
                "lastName": user.lastName,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
                "address": user.address
        };
            
            
        const response = await fetch(updateURL, {
            method: 'PUT',
            body: JSON.stringify(mybody), // string or object
            headers: {
                  'Content-Type': 'application/json'
                }
            });
    }

   async delete(user: User){

      const index = findIndexByID(user.id,this.users);
      let tr = this.tableEle.children[index+1] as HTMLTableRowElement;
      let dltbtn = tr.children[tr.children.length-1] as HTMLButtonElement;
      if(dltbtn.innerHTML === "Delete")
        {
              const deleteURL = this.myURL + '/delete/'+ `${user.id}`;
              const response = await fetch(deleteURL, 
                {
                 method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
                }); 
    
              tr.remove();
              this.users.splice(index,1);
              this.load(); 
        }
        else
        {
            this.cancel(user);
        }  
        
    }

    cancel(user:User)
    {
        let index = findIndexByID(user.id,this.users);
        let tr = this.tableEle.children[index+1] as HTMLTableRowElement;
        let editbtn = tr.children[tr.children.length-2] as HTMLButtonElement;
        let dltbtn = tr.children[tr.children.length-1] as HTMLButtonElement;
    
        tr.contentEditable = "false";
        dltbtn.innerHTML = "Delete";
        editbtn.innerHTML = "Edit";
        this.load();
    }

    refresh()
    {
        this.users = [];
        this.initialize();
        this.load(); 
    }

}

