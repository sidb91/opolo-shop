import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@email.com",
        password: bcrypt.hashSync("user1234", 10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@email.com",
        password: bcrypt.hashSync("user1234", 10),
        isAdmin: false
    },
    {
        name: "Jane",
        email: "jane@email.com",
        password: bcrypt.hashSync("user1234", 10),
        isAdmin: false
    }
];

export default users;