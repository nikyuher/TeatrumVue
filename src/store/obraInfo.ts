import { defineStore } from 'pinia';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

interface ObraInfo {
    idObra: number;
    titulo: string;
    precio: number;
    descripción:string;
    fechaHora: string;
    imagen: string;
}

const getImagenUrl = (imagenBytes: string) => {
    const base64ToBlob = (base64: string) => {
        const binaryString = window.atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Blob([bytes], { type: 'image/png' });
    };

    const blob = base64ToBlob(imagenBytes);
    return URL.createObjectURL(blob);
};

export const useObraInfo = defineStore({

    id: 'obraInfo',

    state: () => ({
        infoObra: null as ObraInfo | null,
        generoEspecifico : [] as ObraInfo[],
        resultadosBusqueda: [] as ObraInfo[]
    }),

    actions: {

        async obraEspecifica (idObra : number )  {
            try {
                const response = await fetch(`${baseUrl}/Obra/${idObra}`);
        
                if (!response.ok) {
                    throw new Error('No se pudo obtener la data');
                }
        
                const data = await response.json();
        
                const infoObra = {
                    idObra: data.obraId,
                    titulo: data.título,
                    precio: data.precioEntrada,
                    descripción: data.descripción,
                    fechaHora: data.fechaHora,
                    imagen: getImagenUrl(data.imagen)
                };
        
                this.setObraInfo(infoObra);
        
            } catch (error) {
                console.error('Error al obtener la obra:', error);
            }
        },
        async listaGeneros (genero : string ) {
            try {
                const response = await fetch(`${baseUrl}/Obra/generos?genero=${genero}`);
                
                if (!response.ok) {
                    throw new Error('No se pudo obtener la data');
                }
                
                const data = await response.json();
                
                this.generoEspecifico = data;
                
            } catch (error) {
                console.error('Error al obtener las obras:', error);
            }
        },
        async searchObra(busqueda : string) {
            try {
                const response = await fetch(`${baseUrl}/Obra/search?titulo=${busqueda}`);
                if (!response.ok) {
                    throw new Error('Fallo al obtener los datos.');
                }
                const data = await response.json();
                this.resultadosBusqueda = data;
            } catch (error) {
                console.log(error);
            }
        },
        setObraInfo(infoObra: ObraInfo) {
            this.infoObra = infoObra;
        }
    }

});