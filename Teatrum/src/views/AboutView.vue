<template>
  <main>
    <div class="letraTextoGeneral">
      <section>
        <div class="contTituloContact">
          <div class="Conocenos">
            <h1>Conocenos</h1>
          </div>
          <div class="imgContact">
            <img src="@/assets/imagenes/contactanos/contactanos.png" alt="">
          </div>
        </div>
      </section>
      <article>
        <section>
          <div class="contContenidoContact">
            <div>
              <img src="@/assets/imagenes/contactanos/quienes-somos.jpg">
            </div>
            <div class="contenidoContact">
              <h2> Quienes Somos</h2>
              <p>Somos Teatrum, una plataforma apasionada por el mundo del teatro y comprometida con
                brindar experiencias únicas a nuestros usuarios. Nos enorgullece conectar a amantes del
                teatro con las mejores producciones, ofreciendo acceso sencillo a boletos para una
                amplia variedad de obras, desde clásicos atemporales hasta las últimas producciones
                contemporáneas.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div class="contContenidoContact">
            <div>
              <img src="@/assets/imagenes/contactanos/que-hacemos.jpeg">
            </div>
            <div class="contenidoContact">
              <h2> Que hacemos</h2>
              <p>En Teatrum, nos dedicamos a proporcionar un espacio digital donde la magia del teatro
                cobra vida. Nuestra misión es facilitar la compra de boletos, permitiéndote descubrir y
                disfrutar de las mejores obras de teatro en tu ciudad. Trabajamos incansablemente para
                ofrecer una plataforma intuitiva, actualizada y llena de opciones, brindándote la
                posibilidad de explorar, reservar y vivir experiencias teatrales inolvidables.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div class="contContenidoContact">
            <div>
              <img src="@/assets/imagenes/contactanos/trabaja-nosotros.jpeg">
            </div>
            <div class="contenidoContact">
              <h2> Trabaja Con Nosotros</h2>
              <p>Teatrum es más que una plataforma de venta de boletos; somos un equipo apasionado que
                valora la creatividad, la innovación y el amor por el teatro. Si compartes nuestra
                pasión y estás interesado en formar parte de nuestro equipo, ¡queremos conocerte!
                Explora oportunidades emocionantes y únete a nosotros para contribuir a enriquecer la
                experiencia teatral de nuestra comunidad.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: antiquewhite
}

.contTituloContact {
  padding: 100px 0;
  display: grid;
}

.contTituloContact h1 {
  font-size: 80px;
  color: rgb(206, 66, 66);
}

.Conocenos {
  margin: auto;
}

.tituloContact h1 {
  width: 100%;
  color: rgb(133, 24, 16)
}

.imgContact {
  display: flex;
  justify-content: center;
}

.imgContact img {
  height: 600px;
}


.contContenidoContact {
  display: flex;
  font-size: 25px;
  width: 90%;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
  padding: 40px 0;
  text-align: justify;
}

.contContenidoContact img {
  height: 400px;
}

.contenidoContact {
  width: 500px;
  margin: auto 40px;
}
</style>
