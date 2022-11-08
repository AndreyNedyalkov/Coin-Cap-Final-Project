export const userManager = (function () {

  class User {
    constructor(username, password, id) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.watchlistIDs = []
      this.assets = [];
      this.money = 3000;
      this.theme = "light";
      this.myBalance = {
        USDT: 3500,
        BTC: 0.2,
        ETH: 3, 
        BNB: 25,
        XRP: 120,
      };
    }
  }

  class UserManager {
    constructor() {
      this.users = [];
      if (localStorage.getItem("users")) {
        this.users = JSON.parse(localStorage.getItem("users"));
      }
    }

    validateCredentials(username, password) {
      return this.users.some(
        (user) => user.username === username && user.password === password
      );
    }

    addUser(username, password) {
      if (!this.checkForExistingUser(username)) {
        const id = this.users[this.users.length - 1]?.id || 0;
        this.users.push(new User(username, password, id+1));
        localStorage.setItem("users", JSON.stringify(this.users));
        return true;
      }
      return false;
    }
    activeUser(username) {
      const index = this.users.findIndex(user => user.username === username);
      const activeUser =  this.users[index] ;
      delete activeUser.password;
      localStorage.setItem("activeUser", JSON.stringify(activeUser));
    }

    checkForExistingUser(username) {
      return this.users.some((user) => user.username === username);
    }
  }

  return new UserManager();
})();
