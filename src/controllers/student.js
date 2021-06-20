const router = require("express").Router();
const Student = require("../models/student");
const verify = require("../utils/verify");
router.get("/students", async (req, res) => {
    try {
        const students = await Student.findAll();
        res.send(students);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post(
    "/students",
    (req, res, next) => {
        let keys = Object.keys(req.body);
        let props = [
            "nom",
            "prenom",
            "sex",
            "dateNaissance",
            "lieuNaissance",
            "email",
            "address",
            "anneBac",
        ];

        const validInputs = props.every((prop) => keys.includes(prop));
        if (!validInputs) {
            return res
                .status(400)
                .send(new Error("required inputs need to be filled"));
        }

        if (!verify.address(req.body.lieuNaissance).success) {
            return res
                .status(400)
                .send(new Error(verify.address(req.body.lieuNaissance).error));
        }

        if (!verify.address(req.body.address).success) {
            return res
                .status(400)
                .send(new Error(verify.address(req.body.lieuNaissance).error));
        }

        if (!verify.minLength(req.body.nom, 2).success) {
            return res
                .status(400)
                .send(new Error(verify.minLength(req.body.nom, 2).error));
        }

        if (!verify.minLength(req.body.prenom, 2).success) {
            return res
                .status(400)
                .send(new Error(verify.minLength(req.body.prenom, 2).error));
        }

        if (!verify.date(req.body.dateNaissance).success) {
            return res
                .status(400)
                .send(new Error(verify.date(req.body.dateNaissance).error));
        }

        if (!verify.email(req.body.email).success) {
            return res
                .status(400)
                .send(new Error(verify.email(req.body.email).error));
        }

        next();
    },
    async (req, res) => {
        try {
            let {
                nom,
                prenom,
                sex,
                dateNaissance,
                lieuNaissance,
                email,
                address,
                anneBac,
            } = req.body;

            const student = new Student(
                nom,
                prenom,
                sex,
                dateNaissance,
                lieuNaissance,
                email,
                address,
                anneBac
            );
            await student.save();
            res.status(201).send(student);
        } catch (error) {
            res.status(500).send(error);
        }
    }
);

module.exports = router;
