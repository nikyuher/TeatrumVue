import { defineStore } from 'pinia';

interface UserInfo {
  usuarioId: number;
  rol: boolean;
  nombre: string;
  correoElectronico: string,
  contraseña:string;
}

export const usarInfoUsuario = defineStore({
  id: 'infoUser',
  state: () => ({
    userInfo: null as UserInfo | null
  }),
  actions: {
    // Almacenar la información del usuario en localStorage
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // Obtener la información del usuario desde localStorage al cargar la página
    // Esto se llama automáticamente al inicio
    loadUserInfo() {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
      }
    }
  }
});