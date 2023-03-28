import firebase from "../firebase";

const db = firebase.ref("/silmun");

class dbService {
    getAll(field, value) {
        if (!value || value === "") {
            return db.orderByChild("name");
        }
        const searchQuery = value
        return db.orderByChild(field).
        startAt(searchQuery).endAt(searchQuery + '\uf8ff');
    }

    create(tutorial) {
        return db.push(tutorial);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new dbService();