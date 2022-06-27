const express = require('express');
const router = express.Router();
const Contenedor = require('../Contenedor');


const productInit = [
    {
      "title": "galletira oreo",
      "price": 120,
      "thumbnail": "url de la foto del producto",
      "id": 1
    },
    {
      "title": "galletira mana",
      "price": 100,
      "thumbnail": "url de la foto del producto",
      "id": 2
    },
    {
      "title": "galletira oreo",
      "price": 130,
      "thumbnail": "url de la foto del producto",
      "id": 3
    }
  ];

const products = new Contenedor ([...productInit]);

router.get('/productos', (req, res) => {
    console.log('Get all products');
    // console.log(products.getAll());

    res.status(200).json(productInit)
});

router.get('/productos/:id', (req, res) => {
    console.log('Get all products by id');
    const {id} = req.params;

    res.status(200).json(products.getById(id) || { error : "producto no encontrado"});
});

router.post('/productos', (req, res) =>{
    console.log('create products', req.body);
    

    if ( !req.body?.title || !req.body?.price || !req.body?.thumbnail ) {
        return res.status(400).json({message : 'faltaron parametros'});
    }
    res.status(200).json(products.save(req.body));
});

router.put('/productos/:id', (req, res) => {
    console.log('update products');
    const {id} = req.params;

    res.status(200).json(products.update(id, {...req.body}) || {message: `the product id was updated : ${id}`})
});

router.delete('/productos/:id', (req, res) => {
    console.log('delete products');
    const {id} = req.params;

    res.status(200).json(products.delete(id) || {message: `the product id was removed : ${id}`})
});


module.exports = router;