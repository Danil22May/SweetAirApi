import * as chai from 'chai';
import chaiHttp from 'chai-http';
const app = require('../app'); // Importa tu archivo app.js
const db = require('../config/db'); // Importa la configuración de la base de datos
const expect = chai.expect;

chai.use(chaiHttp);

describe('Comment API', () => {
    describe('GET /api/comments', () => {
        it('debería obtener todos los comentarios', (done) => {
            chai.request(app)
                .get('/api/comments')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /api/comments', () => {
        it('debería crear un nuevo comentario', (done) => {
            const newComment = {
                author: 'Ana',
                text: 'Prueba.'
            };

            chai.request(app)
                .post('/api/comments')
                .send(newComment)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.text).to.equal('Comment created successfully');
                    done();
                });
        });
    });

    describe('DELETE /api/comments/:id', () => {
        let commentId;

        before((done) => {
            // Crear un comentario de prueba para luego eliminarlo
            db.query('INSERT INTO comments (author, text) VALUES (?, ?)', ['Test Author', 'Test Comment Text'], (err, result) => {
                if (err) {
                    console.error('Error creating test comment:', err);
                    done(err);
                }
                commentId = result.insertId;
                done();
            });
        });

        it('debería eliminar un comentario existente', (done) => {
            chai.request(app)
                .delete(`/api/comments/${commentId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Comment deleted successfully');
                    done();
                });
        });
    });
});

