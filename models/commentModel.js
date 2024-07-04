const db = require('../config/db');

const Comment = {
    create: (author, comment, callback) => {
        db.query('INSERT INTO Comment (author, comment) VALUES (?, ?)', [author, comment], callback);
    },
    getAll: (callback) => {
        db.query('SELECT * FROM Comment', callback);
    },
    update: (id, author, comment, callback) => {
        db.query('UPDATE Comment SET author = ?, comment = ? WHERE id = ?', [author, comment, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Comment WHERE id = ?', [id], callback);
    }
};

module.exports = Comment;
