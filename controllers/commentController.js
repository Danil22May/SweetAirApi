const db = require('../config/db');

exports.createComment = (req, res) => {
    const { author, text } = req.body;

    db.query('INSERT INTO Comment (author, text) VALUES (?, ?)', [author, text], (err, result) => {
        if (err) {
            console.error('Error creating comment:', err);
            return res.status(500).send('Error creating comment');
        }
        res.status(201).send('Comment created successfully');
    });
};

exports.getComments = (req, res) => {
    db.query('SELECT * FROM Comment', (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.status(500).send('Error fetching comments');
        }
        res.json(results);
    });
};

exports.updateComment = (req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;

    db.query('UPDATE Comment SET author = ?, text = ? WHERE id = ?', [author, text, id], (err, result) => {
        if (err) {
            console.error('Error updating comment:', err);
            return res.status(500).send('Error updating comment');
        }
        res.send('Comment updated successfully');
    });
};

exports.deleteComment = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Comment WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting comment:', err);
            return res.status(500).send('Error deleting comment');
        }
        res.send('Comment deleted successfully');
    });
};
