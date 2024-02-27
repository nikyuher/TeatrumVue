import { defineStore } from 'pinia';

interface UserInfo {
  usuarioId: number;
  rol: boolean;
  nombre: string;
}

export const usarInfoUsuario = defineStore({
  id: 'auth',
  state: () => ({
    userInfo: null as UserInfo | null
  }),
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    }
  }
});
