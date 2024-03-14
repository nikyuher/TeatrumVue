import { defineStore } from 'pinia';

interface ButacaInfo {
    asientoId: number;
    nombreAsiento: string;
    estado: boolean;
}

interface ButacaSeleccionada extends ButacaInfo {
    cantidad: number;
}

export const useInfoButaca = defineStore({
    id: 'infoButaca',
    state: () => ({
        butacasSeleccionadas: [] as ButacaSeleccionada[]
    }),
    actions: {
        ButacasSeleccionadas(butaca: ButacaInfo  ) {
            const index = this.butacasSeleccionadas.findIndex(b => b.asientoId === butaca.asientoId);
            if (index === -1) {
                this.butacasSeleccionadas.push({ ...butaca, cantidad: 1 });
            } else {
                this.butacasSeleccionadas.splice(index, 1);
            }
        }
    }
});
