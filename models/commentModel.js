const db = require('../config/db');

const Comment = {
    create: (author, text, callback) => {
        db.query('INSERT INTO Comment (author, text) VALUES (?, ?)', [author, text], callback);
    },
    getAll: (callback) => {
        db.query('SELECT * FROM Comment', callback);
    },
    update: (id, author, text, callback) => {
        db.query('UPDATE Comment SET author = ?, text = ? WHERE id = ?', [author, text, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Comment WHERE id = ?', [id], callback);
    }
};

module.exports = Comment;
