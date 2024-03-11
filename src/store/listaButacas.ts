import { defineStore } from 'pinia';

export const useInfoAsientos = defineStore('infoAsientos', {
  state: () => ({
    asientos: [] as any[], 
  }),
  actions: {
    setAsientos(nuevosAsientos: any[]) {
      this.asientos = nuevosAsientos;
    },
  },
});
