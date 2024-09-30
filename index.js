

class User {
    constructor(name) {
        //Variables que pertenecen a la clase
        this.name = name;
    }

    showUser() {
        console.log(this.name);
    }
}

const user1 = new User("Pepe");

user1.showUser();