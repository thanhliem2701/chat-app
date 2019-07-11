class Users {
  constructor() {
    this.list = [];
  }
  addUser(user) {
    this.list = [...this.list, user];
  }

  findUserById(id) {
    const user = this.list.find(user => user.id === id);
    // const user1 = this.list.filter(user => user.id === id)[0];
    // const user1 = this.list[this.list.findIndex(user => user.id === id)];
    return user;
  }

  removeUserById(id) {
    this.list = this.list.filter(user => user.id !== id);
  }

  getListOfUserInRoom(roomName) {
    return this.list.filter(user => user.room === roomName);
  }
}
module.exports = { Users };
