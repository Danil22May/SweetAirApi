const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Importa tu archivo app.js
const db = require('../config/db'); // Importa la configuración de la base de datos
const expect = chai.expect;

chai.use(chaiHttp);

describe('Location API', () => {
    before((done) => {
        // Código de inicialización antes de las pruebas, como asegurar que la tabla Location existe, etc.
        // Puedes ejecutar scripts SQL aquí para limpiar y preparar la base de datos si es necesario
        done();
    });

    after((done) => {
        // Código de limpieza después de las pruebas
        done();
    });

    describe('GET /api/locations', () => {
        it('debería obtener todas las ubicaciones', (done) => {
            chai.request(app)
                .get('/api/locations')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // Otros tests para POST, PUT y DELETE en /api/locations
});

