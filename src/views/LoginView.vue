<script setup lang="ts">
import { ref } from 'vue';

    const isRegisterView = ref<boolean>(false);

    const showRegisterForm = () => {
      isRegisterView.value = true;
    };

    const showLoginForm = () => {
      isRegisterView.value = false;
    };

</script>

<template>
 <main>
    <article>
      <section>
        <div :class="{ 'wrapper': true, 'active': isRegisterView }">
          <div class="form-box login">
            <h2>Login</h2>
            <form id="formularioL">
              <div class="respuesta2" id="respuesta2"></div>
              <div class="input-box">
                <span class="icon"><ion-icon name="mail" required></ion-icon></span>
                <input type="text" name="" id="nombre2" required>
                <label>Username</label>
              </div>
              <div class="input-box">
                <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" name="" id="contrasena2" required>
                <label>Password</label>
              </div>
              <div class="remember-forgot">
                <label><input type="checkbox">Remember me</label>
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" id="login" class="btn">Login</button>
              <div class="login-register">
                <p>Don't have an account?<a href="#" class="register-link" @click="showRegisterForm">Register</a></p>
              </div>
            </form>
          </div>
          <div class="form-box register">
            <h2>Registration</h2>
            <form id="formulario">
              <div class="respuesta" id="respuesta"></div>
              <div class="input-box">
                <span class="icon"><ion-icon name="person"></ion-icon></span>
                <input type="text" name="" id="nombre" required>
                <label>Username</label>
              </div>
              <div class="input-box">
                <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" name="" id="contrasena" required>
                <label>Password</label>
              </div>
              <div class="remember-forgot">
                <label><input type="checkbox" required>I agree to the terms & conditions</label>
              </div>
              <button id="register" type="submit" class="btn">Register</button>
              <div class="login-register">
                <p>Already have an account?<a href="#" class="login-link" @click="showLoginForm">Login</a></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

main {
    background-image: url(@/assets/imagenes/fondos/fondoLogin.jpg);
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .respuesta p{
      border: 1px solid green;
      color: green;  
      padding: 5px;
      background: rgb(146, 233, 143);
      border-radius: 5px;
      font-size: 20px;
  }
  .respuesta h3{
      border: 1px solid rgb(119, 38, 38);
      color: rgb(119, 38, 38);  
      padding: 5px;
      background: rgb(236, 125, 125);
      border-radius: 5px;
      font-size: 20px;
  }
  .respuesta2 p{
      display:none;
      border: 1px solid green;
      color: green;  
      padding: 5px;
      background: rgb(146, 233, 143);
      border-radius: 5px;
      font-size: 20px;
  }
  .respuesta2 h3{
      border: 1px solid rgb(119, 38, 38);
      color: rgb(119, 38, 38);  
      padding: 5px;
      background: rgb(236, 125, 125);
      border-radius: 5px;
      font-size: 20px;
  }  
header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
}

.logo{
    font-size: 4em;
    user-select: none;
    font-family: 'Courier New', Courier, monospace;
}
.logo a{
    color: rgb(238, 45, 45);
}
.logo a:hover{
    color: rgb(167, 15, 15);
}


.wrapper{
    position: relative;
    width: 400px;
    height: 440px;
    background: transparent;
    border: 2px solid rgb(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px black;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: .2s ease;
}

.wrapper .form-box{
    width: 100%;
    padding: 40px;
}

.wrapper.active{
    height: 520px;
}

.wrapper.active .form-box.login{
    transition: none;
    transform: translateX(-400px);
}

.wrapper .form-box.login{
    transition: .18s ease;
    transform: translateX(0);
}

.wrapper .form-box.register{
    position: absolute;
    transition: none;
    transform: translateX(400px);
}
.wrapper.active .form-box.register{
    transition: .18s ease;
    transform: translateX(0);
}



.form-box h2{
    font-size: 2em;
    color: rgb(21, 28, 85);
    text-align: center;
}
.input-box{
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgb(21, 28, 85);
    margin: 30px 0;
}

.input-box label{
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: rgb(21, 28, 85);
    font-weight: 500;
    pointer-events: none;
    transition: .5s;
}

.input-box input:focus~label,
.input-box input:valid~label{
    top:-5px
}
.input-box input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: rgb(21, 28, 85);
    font-weight: 600;
    padding: 0 35px 0 5px;
}
.input-box .icon{
    position: absolute;
    right: 8px;
    font-size: 1.2em;
    color: rgb(21, 28, 85);
    line-height: 57px;
}

.remember-forgot{
    font-size: .9em;
    color: rgb(21, 28, 85);
    font-weight: 500;
    margin: -15px 0 15px;
    display: flex;
    justify-content: space-between;
}

.remember-forgot label input{
    accent-color: rgb(21, 28, 85);
    margin: 3px;
}

.remember-forgot a{
    color: rgb(21, 28, 85);
    text-decoration: none;
}
.remember-forgot a:hover{
    text-decoration: underline;
}

.btn{
    width: 100%;
    height: 45px;
    background-color:rgb(21, 28, 85) ;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    font-size:1em;
    color: white;
    font-weight: 500;
}

.login-register{
    font-size: .9em;
    color: rgb(21, 28, 85);
    text-align: center;
    font-weight: 500;
    margin: 25px 0 10px;
}

 .login-register p a{
    color: rgb(21, 28, 85);
    text-decoration: none;
    font-weight: 600;
 }

 .login-register p a:hover{
    text-decoration: underline;
 }
</style>