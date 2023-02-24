const url = 'http://localhost:3000/api/rentas/';
const url_p = 'http://localhost:3000/api/peliculas/';
const url_s = 'http://localhost:3000/api/socios/'; 

const contenedor = document.querySelector('tbody');
let resultados = '';
let opcion = '', opcion_so='', opcion_pe='';
let L_pelicula = [];
let L_socio = [];
let ban = 0;

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const modalSocio = new bootstrap.Modal(document.getElementById('modalSocio'));
const modalPelicula = new bootstrap.Modal(document.getElementById('modalPelicula'));

//entradas de la renta
const formArticulo = document.querySelector('form');
const cod_socio = document.getElementById('cod_socio');
const cod_peli = document.getElementById('cod_peli');
const fecha_alq = document.getElementById('fecha_alq');
const fecha_entre = document.getElementById('fecha_entre');


//entradas socios
const formSocio = document.getElementById('frm_socio');
const so_nombre = document.getElementById('so_nombre');
const so_apellido = document.getElementById('so_apellido');
const so_correo = document.getElementById('so_correo');
const so_celular = document.getElementById('so_celular');
const so_tipo = document.getElementById('tipo_so');
const fecha_na = document.getElementById('fecha_nac');
//entradas peliculas
const formPelicula = document.getElementById('frm_pelicula');
const pe_nombre = document.getElementById('pe_nombre');
const tipo_pe = document.getElementById('tipo_pe');
const peli_costo = document.getElementById('peli_costo');

btnCrear.addEventListener('click', () => {
    cod_socio.value = '';
    cod_peli.value = '';
    fecha_alq.value = '';
    fecha_entre.value = '';
    opcion = 'crear';
    if (ban == 0) {
        fillSelectPelicula();
        fillSelectSocio();
        ban = 1;
    }
    modalArticulo.show();
});

btnCrearSocio.addEventListener('click', () => {
    so_nombre.value = '';
    so_tipo.value = '';
    fecha_na.value = '';
    opcion_so = 'crear';
    modalSocio.show();
});


btnCrearPelicula.addEventListener('click', () => {
    pe_nombre.value = '';
    tipo_pe.value = '';
    peli_costo.value = '';
    opcion_pe = 'crear';
    modalPelicula.show();
});



//METODO GET  PARA  MOSTRAR RESULTATDOS
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `
            <tr class="text-center">
                <td>${articulo.codigo}</td>
                <td>${articulo.cod_socio}</td>
                <td>${articulo.cod_pelicula}</td>
                <td>${articulo.fecha_alquiler}</td>
                <td>${articulo.fecha_entrega}</td>
                <td>${articulo.total}</td>
                <td><a class='btnEditar btn btn-primary'>Editar</a><a class='btnBorrar btn btn-danger'>Devolver</a></td>
            </tr>
        `;
    });
    contenedor.innerHTML = resultados;
};

// Procedimiento get
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

var pelicula_obj = {
    codigo: '',
    nombre: '',
    genero: '',
    costo: 0,
};

const cargar_p = (peliculas) => {
    peliculas.forEach(peliculas => {
        pelicula_obj = {
            codigo: peliculas.codigo,
            nombre: peliculas.nombre,
            genero: peliculas.genero,
            costo: peliculas.costo,
        }
        L_pelicula.push(pelicula_obj);
    });
};


function fillSelectPelicula() {
    var selectList = document.getElementById("cod_peli");
    L_pelicula.forEach(element => {
        selectList.innerHTML += `<option value='${element.codigo}'> ${element.nombre}</option>`
    });
}

// Procedimiento get peliculas
fetch(url_p)
    .then(response => response.json())
    .then(data => cargar_p(data))
    .catch(error => console.log(error));

const on2 = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

function buscarSocio(codigo) {
    for (var i = 0; i < L_socio.length; i++) {
        if (L_socio[i].codigo == codigo) {
            return L_socio[i];
        }
    }
}


function buscarPelicula(codigo) {

    for (var i = 0; i < L_pelicula.length; i++) {
        if (L_pelicula[i].codigo == codigo) {
            return L_pelicula[i];
        }
    }

}


var socio_obj = {
    codigo: '',
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    tipo: '',
    fecha_nacimiento: '',
};

const cargar_s = (socios) => {
    socios.forEach(socios => {
        socio_obj = {
            codigo: socios.codigo,
            nombre: socios.nombre,
            apellido: socios.apellido,
            correo: socios.correo,
            celular: socios.celular,
            tipo: socios.tipo,
            fecha_nacimiento: socios.fecha_nacimiento,
        }
        L_socio.push(socio_obj);
    });
};


function fillSelectSocio() {
    var selectList = document.getElementById("cod_socio");
    L_socio.forEach(element => {
        selectList.innerHTML += `<option value='${element.codigo}'> ${element.nombre}</option>`
    });
}

// Procedimiento get socios
fetch(url_s)
    .then(response => response.json())
    .then(data => cargar_s(data))
    .catch(error => console.log(error));

const on3 = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};


//BORRAR UN ELEMENTO
on(document, 'click', '.btnBorrar', e => {
    const row = e.target.parentNode.parentNode;
    const id = row.firstElementChild.innerHTML;


    let cod_p = row.children[2].innerHTML;
    let fecha_entre = row.children[4].innerHTML;
    let total = row.children[5].innerHTML;
    let fecha = Date.now();


    let dif_dias = parseInt(getDate(fecha_entre, fecha));

    if (dif_dias > 0) {
        let pelicula = buscarPelicula(cod_p);

        let multa = dif_dias * pelicula.costo;
        let recargo = multa * 0.05;
        let pago_final = parseFloat(total) + multa + recargo;
        
        alert("Dias de retraso: " + dif_dias + " Recargo: " + recargo + " Multa: " + multa + " Pago final: " + pago_final);
    }
    alertify.confirm("Desea devolver esta renta?.",
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => {
                    location.reload();
                    alertify.success('Renta Eliminado');
                });
        },
        function () {
            alertify.error('Cancelado');
        });

    
});

//PROCEDIMIENTO EDITAR
let idForm = 0;
on(document, 'click', '.btnEditar', e => {
    opcion = 'editar';
    if (ban == 0) {
        fillSelectPelicula();
        fillSelectSocio();
        ban = 1;
    }

    const row = e.target.parentNode.parentNode;
    idForm = row.children[0].innerHTML;
    cod_socio.value = row.children[1].innerHTML;
    cod_peli.value = row.children[2].innerHTML;
    fecha_alq.value = row.children[3].innerHTML;
    fecha_entre.value = row.children[4].innerHTML;
    console.log(row.children[1]);
    modalArticulo.show();
});


function getDate(dateIn, dateOut) {
    var timeIn = new Date(dateIn)
    var timeOut = new Date(dateOut)
    var differenceTime = timeOut - timeIn;
    return differenceTime / (1000 * 3600 * 24)
}


function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

//PROCEDIMIENTO DE CREAR Y EDITAR
formArticulo.addEventListener('submit', e => {
    e.preventDefault();
    if (opcion === 'crear') {
        let socio = buscarSocio(cod_socio.value);
        let pelicula = buscarPelicula(cod_peli.value);
        let socio_edad = calcularEdad(socio.fecha_nacimiento);

        if ((pelicula.genero == 'TERROR' && socio_edad > 18) || (pelicula.genero != 'TERROR')) {

            let dias = getDate(fecha_alq.value, fecha_entre.value);
            let desc = 0;
            let t_cost = dias * pelicula.costo;
            if (socio.tipo == 'VIP') {
                desc = t_cost * 0.10;
            }
            if (socio.tipo == 'EXCLUSIVO') {
                desc = t_cost * 0.05;
            }

            t_cost = t_cost - desc;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    cod_socio: cod_socio.value,
                    cod_pelicula: cod_peli.value,
                    fecha_alquiler: fecha_alq.value,
                    fecha_entrega: fecha_entre.value,
                    total: t_cost,
                })
            })
                .then(res => res.json())
                .then(data => {
                    const nuevoArticulo = [];
                    nuevoArticulo.push(data);
                    mostrar(nuevoArticulo);
                });

        } else {
            alertify
                .alert("Alerta", "No se puede rentar, no cumple con requisitos de edad", function () {
                    alertify.message('OK');
                });
        }


    }
    if (opcion === 'editar') {


        let socio = buscarSocio(cod_socio.value);
        let pelicula = buscarPelicula(cod_peli.value);
        let socio_edad = calcularEdad(socio.fecha_nacimiento);

        if ((pelicula.genero == 'TERROR' && socio_edad > 18) || (pelicula.genero != 'TERROR')) {

            let dias = getDate(fecha_alq.value, fecha_entre.value);
            let desc = 0;
            let t_cost = dias * pelicula.costo;
            if (socio.tipo == 'VIP') {
                desc = t_cost * 0.10;
            }
            if (socio.tipo == 'EXCLUSIVO') {
                desc = t_cost * 0.05;
            }

            t_cost = t_cost - desc;


            fetch(url + idForm, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    cod_socio: cod_socio.value,
                    cod_pelicula: cod_peli.value,
                    fecha_alquiler: fecha_alq.value,
                    fecha_entrega: fecha_entre.value,
                    total: t_cost,
                })
            })
                .then(res => res.json())
                .then(res => location.reload());
        } else {
            alert("No se puede rentar, no cumple con requisitos de edad");
        }
    }
    modalArticulo.hide();
});

//PROCEDIMIENTO DE CREAR SOCIO
formSocio.addEventListener('submit', e => {
    e.preventDefault();
    if (opcion_so === 'crear') {
        fetch(url_s, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nombre: so_nombre.value,
                apellido: so_apellido.value,
                correo: so_correo.value,
                celular: so_celular.value,
                tipo: so_tipo.value,
                fecha_nacimiento: fecha_na.value,
            })
        })
        .then( res => res.json() )
    }
    modalSocio.hide();
});


//PROCEDIMIENTO DE CREAR SOCIO
formPelicula.addEventListener('submit', e => {
    e.preventDefault();
    if (opcion_pe === 'crear') {
        fetch(url_p, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nombre: pe_nombre.value,
                genero: tipo_pe.value,
                costo: peli_costo.value,
            })
        })
        .then( res => res.json() )
    }
    modalPelicula.hide();
});
