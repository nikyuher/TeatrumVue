<script setup lang="ts">

</script>

<template>
    <main>
        <article>
            <div class="letraTextoGeneral">
                <section>
                    <div class="contenedorTituloEstrenos">
                        <div class="titulo">
                            <h1>Proximos Estrenos</h1>
                        </div>
                        <div class="imagenProxEstrenos">
                            <img src="@/assets/imagenes/sala-de-teatro-referencial.jpg" alt="">
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <div class="contProximosEstrenos">
                            <div class="cajaProxExtrenos">
                                <img src="@/assets/imagenes/obras/patata2.png">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sit vel aliquid
                                    soluta
                                    illum
                                    dignissimos sequi ipsum
                                </p>
                                <p>€ 9.99</p>
                            </div>
                            <div class="cajaProxExtrenos">
                                <img src="@/assets/imagenes/obras/patata2.png">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sit vel aliquid
                                    soluta
                                    illum
                                    dignissimos sequi ipsum
                                </p>
                                <p>€ 9.99</p>
                            </div>
                            <div class="cajaProxExtrenos ">
                                <img src="@/assets/imagenes/obras/patata2.png">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sit vel aliquid
                                    soluta
                                    illum
                                    dignissimos sequi ipsum
                                </p>
                                <p>€ 9.99</p>
                            </div>
                            <div class="cajaProxExtrenos ">
                                <img src="@/assets/imagenes/obras/patata2.png">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sit vel aliquid
                                    soluta
                                    illum
                                    dignissimos sequi ipsum
                                </p>
                                <p>€ 9.99</p>
                            </div>
                            <div class="cajaProxExtrenos ">
                                <img src="@/assets/imagenes/obras/patata2.png">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sit vel aliquid
                                    soluta
                                    illum
                                    dignissimos sequi ipsum
                                </p>
                                <p>€ 9.99</p>
                            </div>
                            <div class="cajaProxExtrenos ">
                                <img src="@/assets/imagenes/obras/patata2.png">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sit vel aliquid
                                    soluta
                                    illum
                                    dignissimos sequi ipsum
                                </p>
                                <p>€ 9.99</p>
                            </div>
                            <div class="cajaProxExtrenos ">
                                <img src="@/assets/imagenes/obras/patata2.png">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi sit vel aliquid
                                    soluta
                                    illum
                                    dignissimos sequi ipsum
                                </p>
                                <p>€ 9.99</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    </main>
</template>

<style scoped>
main {
    background-color: rgb(55, 55, 117);
    color: white;
}

.contenedorTituloEstrenos {
    display: grid;
}

.titulo h1 {
    width: 100%;
    color: rgb(255, 60, 60);
}

.imagenProxEstrenos {
    display: flex;
    justify-content: center;
}

.imagenProxEstrenos img {
    width: 90%;
    height: 400px;
}

.contProximosEstrenos {
    width: 1140px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    margin: auto;
}

.cajaProxExtrenos {
    display: flex;
    text-align: justify;
    align-items: center;
    flex-wrap: wrap;
    color: black;
    width: 300px;
    height: 400px;
    border: black solid 1px;
    border-radius: 10px;
    padding: 10px;
    background-color: white;
    margin: 40px;
}
</style>