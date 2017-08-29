const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fields = [{ title: 'Código', data: 'code', orderable: true },
{ title: 'Nome', data: 'name', orderable: true },
{ title: 'Marca', data: 'brand', orderable: true },
{ title: 'Estoque', data: 'stock', orderable: true },
{ title: 'Unid. de medida', data: 'unitOfMeasurement', orderable: true },
{ title: 'Valor da unid.', data: 'unitValue', orderable: true }];

const db = require('./db-mock.json');;
let PRODUCTS = db.products;
let SALES = [];

app.use(cors());

const router = express.Router();


router.route('/products/brands')
    .get(function (req, res) {
        let brands = [...new Set(PRODUCTS.map(product => product.brand))];
        if(!req.query.term) return res.send({ data: brands });
        const term = req.query.term.toLowerCase();
        const data = brands.filter(brand => brand.toLowerCase().indexOf(term) >= 0)
        res.send({ data: data });
    });

router.route('/products')
    .get(function (req, res) {
        const table = {
            page: +req.query.page,
            length: +req.query.length,
            total: PRODUCTS.length,
            columns: fields
        };

        var first = table.page * table.length;
        table.data = PRODUCTS.slice(first, first + table.length);
        res.send(table);
    })
    .post(function (req, res) {
        const product = req.body;
        PRODUCTS.push(product);
        res.send({ data: product });
    });

router.route('/products/:id')
    .get(function (req, res) {
        const data = PRODUCTS.filter(product => product.code === req.params.id);
        if (data.length === 0) res.status(500).send({ error: "Product not found!" });
        else res.send({ data: data[0] });
    })
    .put(function (req, res) {
        const i = PRODUCTS.findIndex(product => product.code === req.params.id);
        if (i === -1) res.status(500).send({ error: "Product not found!" });
        else {
            PRODUCTS[i] = Object.assign(PRODUCTS[i], req.body);
            res.send({ data: PRODUCTS[i] });
        }
    })
    .delete(function (req, res) {
        const i = PRODUCTS.findIndex(product => product.code === req.params.id);
        if (i === -1) res.status(500).send({ error: "Product not found!" });
        else {
            PRODUCTS.splice(i, 1);
            res.send({ data: {} });
        }
    });

router.route('/products/:id/stock')
    .put(function (req, res) {
        const i = PRODUCTS.findIndex(product => product.code === req.params.id);
        if (i === -1) res.status(500).send({ error: "Product not found!" });
        else {
            PRODUCTS[i].stock = req.body.stock;
            PRODUCTS[i].stockRecommended = req.body.stockRecommended;
            res.send({ data: PRODUCTS[i] });
        }
    });

router.route('/sales')
    .get(function (req, res) {
        const table = {
            page: +req.query.page,
            length: +req.query.length,
            total: SALES.length,
            columns: [{ title: 'Id', data: 'id', orderable: true },
            { title: 'Data', data: 'date', orderable: true },
            { title: 'Forma de Pagameto', data: 'paymentForm', orderable: true },
            { title: 'Total', data: 'total', orderable: true }]
        };

        const first = table.page * table.length;
        table.data = SALES.slice(first, first + table.length);
        res.send(table);
    })
    .post(function (req, res) {
        const sale = req.body;
        sale.id = SALES.length + 1;
        sale.date = new Date();
        sale.total = sale.items.map(i => i.amount * i.product.unitValue).reduce((a, b) => a + b) - (this.discount || 0);
        console.log(sale);
        SALES.push(sale);
        res.send({ data: sale });
    });

router.route('/sales/:id')
    .get(function (req, res) {
        const data = SALES.filter(sale => sale.id === req.params.id);
        if (data.length === 0) res.status(500).send({ error: "Sale not found!" });
        else res.send({ data: data[0] });
    })

app.use('/api', router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
