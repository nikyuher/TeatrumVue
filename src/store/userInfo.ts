import { defineStore } from 'pinia';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

interface UserInfo {
  usuarioId: number;
  rol: boolean;
  nombre: string;
  correoElectronico: string
}

export const usarInfoUsuario = defineStore({
  id: 'infoUser',
  state: () => ({
    userInfo: null as UserInfo | null,
    listaUser: [] as UserInfo[]
  }),
  actions: {

    async changeUserInfo (Usuario : any) {
      try {
        const response = await fetch(`${baseUrl}/Usuario/${Usuario.usuarioId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(Usuario)
      });
  
      if (!response.ok) {
          throw new Error('Fallo al Hacer cambios.');
      }
    } catch (error) {
      console.log(error);
      throw new Error( "El valor ya esta en Uso");
    }
    },
    async listaUsers () {

      try {
        
        const response = await fetch(`${baseUrl}/Usuario`);

        if (!response.ok) {
            throw new Error('Fallo al obtener la lista de usuarios.');
        }

        const data = await response.json();

        this.listaUser = data

      } catch (error) {
        console.log(error)
        throw error;
      }

    },
    async loginUser (login : any){
      try {
        const response = await fetch(`${baseUrl}/Usuario/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(login)
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al iniciar sesión.');
        }
 
        const userInfo = await response.json()

        const infoUsuario = {
          usuarioId: userInfo.usuarioId,
          rol: userInfo.rol,
          nombre: userInfo.nombre,
          correoElectronico: userInfo.correoElectronico,
          contraseña: userInfo.contraseña
        }

        this.userInfo = infoUsuario

      } catch (error) {
        console.error(error);
        throw error;
      }
  },
    async addUser (User : any){
      try {
        const response = await fetch(`${baseUrl}/Usuario/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(User)
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'error al Crear al usuario.');
      }
      } catch (error) {
        console.error(error);
        throw error;
      }
  },
    async deleteUser (idUser : number){
        try {
          const response = await fetch(`${baseUrl}/Usuario/${idUser}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Fallo al eliminar Usuario.');
        }
        } catch (error) {
          console.error(error);
          throw error;
        }
    },
    setUserInfo(userInfo: UserInfo ) {
      this.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // Esto se llama automáticamente al inicio
    loadUserInfo() {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
      }
    }
  }
});