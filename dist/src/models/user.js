var Role;
(function (Role) {
    Role["SUPERADMIN"] = "SUPERADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["SUBSCRIBER"] = "SUBSCRIBER";
})(Role || (Role = {}));
class User {
    constructor(id, firstName, lastName, email, phone, role, address, middleName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.address = address;
        this.middleName = middleName;
    }
}
export { User, Role };
//# sourceMappingURL=user.js.map