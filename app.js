const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
//Establecemos los prámetros de conexión
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'videoclub'
})
//Conexión a la database
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("¡Conexión exitosa a la base de datos!")
    }
})
app.get('/', function(req,res){
    res.send('Ruta INICIO')
})
//Mostrar todos las rentas
app.get('/api/rentas', (req,res)=>{
    conexion.query('SELECT * FROM rentas', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})


app.get('/api/peliculas', (req,res)=>{
    conexion.query('SELECT * FROM peliculas', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

app.get('/api/socios', (req,res)=>{
    conexion.query('SELECT * FROM socios', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})


//Mostrar un SOLO rentas
app.get('/api/rentas/:codigo', (req,res)=>{
    conexion.query('SELECT * FROM rentas WHERE codigo = ?', [req.params.codigo], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})




//Crear un rentas
app.post('/api/rentas', (req,res)=>{
    let data = {codigo:req.body.codigo, 
        cod_socio:req.body.cod_socio, 
        cod_pelicula:req.body.cod_pelicula,
        fecha_alquiler:req.body.fecha_alquiler,
        fecha_entrega:req.body.fecha_entrega,
        total:req.body.total}
    let sql = "INSERT INTO rentas SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})

//Crear pelicula
app.post('/api/peliculas', (req,res)=>{
    let data = {codigo:req.body.codigo, 
        nombre:req.body.nombre, 
        genero:req.body.genero,
        costo:req.body.costo}
    let sql = "INSERT INTO peliculas SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})

//Crear socio
app.post('/api/socios', (req,res)=>{
    let data = {codigo:req.body.codigo, 
        nombre:req.body.nombre, 
        tipo:req.body.tipo,
        fecha_nacimiento:req.body.fecha_nacimiento}
    let sql = "INSERT INTO socios SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})



//Editar articulo
app.put('/api/rentas/:codigo', (req, res)=>{
    let codigo = req.params.codigo
    let cod_socio = req.body.cod_socio
    let cod_pelicula = req.body.cod_pelicula
    let fecha_alquiler = req.body.fecha_alquiler
    let fecha_entrega = req.body.fecha_entrega
    let total = req.body.total
    let sql = "UPDATE rentas SET cod_socio = ?, cod_pelicula = ?, fecha_alquiler = ?, fecha_entrega = ?, total = ? WHERE codigo = ?"
    conexion.query(sql, [cod_socio, cod_pelicula, fecha_alquiler,fecha_entrega,total,codigo], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
})
//Eliminar articulo
app.delete('/api/rentas/:codigo', (req,res)=>{
    conexion.query('DELETE FROM rentas WHERE codigo = ?', [req.params.codigo], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})

const puerto = process.env.PUERTO || 3000
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto)
})
