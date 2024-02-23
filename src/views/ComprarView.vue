<script lang="ts">
export default {
    name: "ComprarView"
}
</script>

<template>
    <main>
        <article>
            <section>
                <div class="contenedorComprar">
                    <div class="descriPopular ">
                        <div class="contImagenObraPopular">
                            <img src="@/assets/imagenes/obras/dracula.jpg" alt="ObraPopular">
                        </div>
                        <div class="descripcionCompra">
                            <h1 id="tituloObra"></h1>
                            <p id="descripcionCompra"></p>
                        </div>
                    </div>
                    <div class="formComprar">
                        <h2>Reserva Asiento</h2>
                        <div class="contenidoForm">
                            <form>
                                <label>Obra de Teatro</label>
                                <input type="text" id="inputNombreObra" readonly>
                                <label>Sitio de Asiento</label>
                                <input type="text" id="inputSitioAsiento" readonly required>
                                <label>Precio:$</label>
                                <input type="number" id="inputPrecio" readonly>
                                <input id="comprar" type="submit" value="Comprar">
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="contenedorBloques">
                    <div class="bloqueA">
                        <button>A1</button>
                        <button>A2</button>
                        <button>A3</button>
                        <button>A4</button>
                        <button>A5</button>
                        <button>A6</button>
                    </div>
                    <div class="bloqueB">
                        <button>B1</button>
                        <button>B2</button>
                        <button>B3</button>
                        <button>B4</button>
                        <button>B5</button>
                        <button>B6</button>
                        <button>B7</button>
                        <button>B8</button>
                        <button>B9</button>
                        <button>B10</button>
                        <button>B11</button>
                        <button>B12</button>
                    </div>
                    <div class="bloqueC">
                        <button>C1</button>
                        <button>C2</button>
                        <button>C3</button>
                        <button>C4</button>
                        <button>C5</button>
                        <button>C6</button>
                    </div>
                </div>
            </section>
        </article>
    </main>
</template>

<style scoped>
main {
    background-color: rgb(55, 55, 117);
    color: white;
}

/*Contenedor*/
.contenedorComprar {
    display: flex;
    height: 500px;
    align-items: center;
    text-align: center;
    margin-bottom: 30px;
}

/*Informacion de la Obra */
.descriPopular {
    display: grid;
    text-align: justify;
    grid-template-columns: repeat(2, 100%);
    width: 450px;
    margin: auto;
}

.descriPopular p {
    font-size: 20px;
}

.contImagenObraPopular {
    margin: auto;
}

.contImagenObraPopular img {
    object-fit: cover;
    height: 400px;
}

/*Formulario de comprar*/
.formComprar {
    width: 300px;
    height: 350px;
    background-color: rgb(255, 255, 255);
    display: grid;
    flex-wrap: wrap;
    align-items: center;
    margin: auto;
    border-radius: 10px;
    color: black;
}

.contenidoForm {
    text-align: left;
    width: 200px;
    margin: auto;
}

.contenidoForm #comprar {
    margin-top: 20px;
}

/*Bloue de seleccion de asientos*/

.contenedorBloques {
    display: flex;
    width: 80%;
    height: 500px;
    justify-content: space-evenly;
    margin: auto;
    padding-bottom: 100px;
}

.bloqueA {
    width: 200px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.bloqueB {
    width: 400px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.bloqueC {
    width: 200px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.contenedorBloques button {

    width: 40px;
    height: 40px;
    margin: 10px 30px;
}

.color-rojo {
    background-color: red;
}
</style>