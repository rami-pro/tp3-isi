const path = require("path");
const fse = require("fs-extra");

const dbPath = path.join(__dirname, "../../db/students.json");

class Student {
    constructor(
        nom,
        prenom,
        sex,
        dateNaissance,
        lieuNaissance,
        email,
        address,
        anneBac
    ) {
        this.nom = nom;
        this.prenom = prenom;
        this.sex = sex;
        this.dateNaissance = dateNaissance;
        this.lieuNaissance = lieuNaissance;
        this.address = address;
        this.anneBac = anneBac;
        this.email = email;
    }

    static async findAll() {
        try {
            const studentsFile = await fse.readJSON(dbPath);
            return studentsFile;
        } catch (error) {
            throw new Error("unable to read from database");
        }
    }

    async save() {
        try {
            let students = await fse.readJSON(dbPath);
            const length = students.students.length;
            //console.log(students, length);
            this.id = length;
            this.generateCode();
            students.students.push(this);
            console.log(students, length);
            await fse.writeJSON(dbPath, students);
        } catch (error) {
            throw new Error("unable to save user to database");
        }

        return this;
    }
    generateCode() {
        let code = `${this.anneBac}-${this.dateNaissance}-${this.lieuNaissance}-${this.sex}-${this.id}`;
        this.code = code;
    }
}

module.exports = Student;
