import { defineStore } from 'pinia';

interface ObraInfo {
    idObra: number;
    titulo: string;
    precio: number;
    fechaHora: string;
    imagen: string;
}

// Define el almacén para la información de la obra
export const useObraInfo = defineStore({
    // Identificador único para el almacén
    id: 'obraInfo',
    // Define el estado inicial
    state: () => ({
        infoObra: null as ObraInfo | null
    }),
    // Define las acciones para manipular el estado
    actions: {
        // Acción para establecer la información de la obra
        setObraInfo(infoObra: ObraInfo) {
            this.infoObra = infoObra;
        }
    }
});