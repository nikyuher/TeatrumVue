import { defineStore } from 'pinia';

interface ButacaInfo {
    asientoId: number;
    nombreAsiento: string;
    estado: boolean;
}

export const useInfoButaca = defineStore({
    id: 'infoButaca',
    state: () => ({
        butacas: null as ButacaInfo | null
    }),
    actions: {
        setButacas(butacas: ButacaInfo) {
            this.butacas = butacas;
        }
    }
});
