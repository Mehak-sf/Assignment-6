export function findIndexByID(id, users) {
    return users.findIndex((user) => user.id === id);
}
