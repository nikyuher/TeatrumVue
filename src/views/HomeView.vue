<template>
  <main>
    <article>
      <div class="letraTextoGeneral">
        <section>
          <div class="contObraPopular">
          </div>
        </section>
        <section>
          <div class="descriPopular ">
            <h1>Bienvenidos a Teatrum</h1>
            <p>Estamos emocionados de ofrecerte una experiencia excepcional en
              el mundo del teatro. Sumérgete en el fascinante universo de las artes escénicas y
              descubre producciones que te transportarán a mundos llenos de emoción, drama y
              creatividad.
            </p>
          </div>
          <div class="border"></div>
        </section>
        <section>
          <div class="contenido1">
            <div class="imgcontent1">
              <img src="@/assets/imagenes/compra-sencilla.jpg">
            </div>
            <div class="texto1">
              <p>Nuestra plataforma está diseñada para facilitar la compra de boletos, brindándote acceso
                rápido y sencillo a una amplia variedad de obras teatrales. Desde clásicos atemporales
                hasta
                las últimas producciones contemporáneas, tenemos algo para cada amante del teatro.
              </p>
            </div>
          </div>
          <div class="border"></div>
        </section>
        <section>
          <div class="contenido2">
            <div class="texto2">
              <p>Explora nuestro catálogo, elige tus asientos preferidos y prepárate para vivir noches
                inolvidables llenas de actuaciones magníficas. En Teatrum, no solo vendemos
                boletos; ofrecemos la llave para adentrarte en el emocionante mundo del teatro.</p>
            </div>
            <div class="botonLlevarGeneros">
              <div class="diseñoBoton">
                <router-link to="/catalogo">Ver Catalogo</router-link>
              </div>
            </div>
            <div class="texto3">
              <p>Agradecemos tu visita y esperamos que encuentres la obra perfecta para ti. ¡Bienvenido al
                teatro en su máxima expresión!</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  </main>
</template>

<style scoped>
/*Obras Populares*/
.contObraPopular {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  background-image: url(@/assets/imagenes/sala-de-teatro-referencial.jpg);
  background-repeat: no-repeat;
  background-size: 100% 600px;
  height: 600px;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
}

main {
  background-color: rgb(0, 0, 0);
  padding-bottom: 30px;
}

.descriPopular {
  color: white;
  text-align: justify;
  width: 80%;
  margin: 0 auto 100px auto;
}

.descriPopular h1 {
  margin-bottom: 50px;
}

.descriPopular p {
  width:600px;
  font-size: 30px;
}

/*Contenido 1*/

.contenido1 {
  display: flex;
  justify-content: space-evenly;
  color: white;
  padding: 40px 0 70px 0;
}

.texto1 {
  width: 500px;
  font-size: 30px;
  text-align: justify;
  margin: auto;
}

.imgcontent1 {
  margin: auto;
}

.imgcontent1 img {
  width: 600px;
}

/*Contenido 2*/

.contenido2 {
  display: grid;
  padding: 40px 0 70px 0;
  color: white;
}

.texto2 {
  width: 70%;
  font-size: 30px;
  text-align: justify;
  margin: auto;
}

.texto3 {
  width: 70%;
  font-size: 30px;
  text-align: justify;
  margin: auto;
}

.botonLlevarGeneros {
  display: flex;
  margin: 80px auto;

}

.diseñoBoton {
  font-size: 50px;
  background-color: rgb(245, 190, 41);
  padding: 10px 60px;
  border-radius: 5px;
}

.diseñoBoton a {
  font-family: 'Agbalumo', serif;
  text-decoration: none;
  color: rgb(138, 17, 17);
}

/* Estilos para dispositivos de 1200px */
@media screen and (max-width: 1200px) {
  .contObraPopular {
    background-repeat: no-repeat;
    background-size: 100% 600px;
  }

  .descriPopular {
    width: 90%;
    margin-bottom: 50px;
  }

  .descriPopular p {
    width: 100%;
    font-size: 24px;
  }

  .contenido1,
  .contenido2 {
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }

  .texto1,
  .texto2,
  .texto3 {
    width: 90%;
    font-size: 24px;
    margin: 20px auto;
  }

  .imgcontent1 img {
    width: 100%;
  }

  .botonLlevarGeneros {
    margin: 40px auto;
  }

  .diseñoBoton {
    font-size: 30px;
    padding: 10px 40px;
  }
}
</style>
