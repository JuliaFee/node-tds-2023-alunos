import db from "../../database/index.js";



export default class UsersRepository {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    const allUsers = await this.db.manyOrNone("SELECT * FROM users");

    // console.log(allUsers);
    return allUsers;
  }

async getUserById(id) {
  const user = await this.db.oneOrNone("SELECT * FROM users WHERE id = $1", id);
    // console.log("user", user);
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      email
    );
    console.log();
    return user;
  }

  async createUser(user) {
    await this.db.none("INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)", [user.id, user.name, user.email, user.password]);
    return user;
  }

  async updateUser(id, name, email, password) {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }
    user.name = name;
    user.email = email;
    user.password = password;

    const updatedUser = await this.db.one(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    )

    return user;
  }

  deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
