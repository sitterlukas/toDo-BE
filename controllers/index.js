const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllTodos = (req, res, next) => {
    conn.query("SELECT * FROM todolist", function (err, data, fields) {
        if(err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createTodo = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [req.body.name, "pending"];
    conn.query(
        "INSERT INTO todolist (name, status) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo created!",
            });
        }
    );
};

exports.getTodo = (req, res, next) => {
    conn.query(
        "SELECT * FROM todolist WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            if(data.length === 0 ) {
                return next(new AppError("No todo id found", 404));
            }
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateTodo = (req, res, next) => {
    if (!req.body.name) return next(new AppError("Missing name in request", 404));
    if (!req.body.status) return next(new AppError("Missing status in request", 404));
    const name = req.body.name;
    const status = req.body.status;
    conn.query(
        "UPDATE todolist SET status= ?, name = ? WHERE id=?",
        [status, name, req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            if(data.affectedRows === 0 ) {
                return next(new AppError("No todo id found", 404));
            }
            res.status(201).json({
                status: "success",
                message: "todo updated!",
            });
        }
    );
};

exports.deleteTodo = (req, res, next) => {
    conn.query(
        "DELETE FROM todolist WHERE id=?",
        [req.params.id],
        function (err, data, fields) {
            if(data.affectedRows === 0 ) {
                return next(new AppError("No todo id found", 404));
            }
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo deleted!",
            });
        }
    );
}