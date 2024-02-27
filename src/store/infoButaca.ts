import { defineStore } from 'pinia';

interface ButacaInfo {
    asientoId: number;
    nombreAsiento: string;
    estado: boolean;
}

export const useInfoButacaStore = defineStore({
    id: 'infoButaca',
    state: () => ({
        butacas: [] as ButacaInfo[]
    }),
    actions: {
        setButacas(butacas: ButacaInfo[]) {
            this.butacas = butacas;
        }
    }
});
