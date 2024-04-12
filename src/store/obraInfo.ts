import { defineStore } from 'pinia';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

interface ObraInfo {
    obraId: number;
    genero: string;
    título: string;
    precio: number;
    descripción: string;
    fechaHora: string;
    imagen: string;
    precioEntrada: number;
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
        resultadosBusqueda: [] as ObraInfo[],
        listaObra: [] as ObraInfo[]
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
                    obraId: data.obraId,
                    genero: data.genero,
                    título: data.título,
                    precio: data.precioEntrada,
                    descripción: data.descripción,
                    fechaHora: data.fechaHora,
                    imagen: getImagenUrl(data.imagen),
                    precioEntrada: data.precioEntrada
                };
        
                this.setObraInfo(infoObra);
        
            } catch (error) {
                console.error('Error al obtener la obra:', error);
                throw error;
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
                throw error;
            }
        },
        async listaObras () {
            try {
          
              const response = await fetch(`${baseUrl}/Obra`);
          
              if (!response.ok) {
                throw new Error('Fallo al obtener la lista de obras.');
              }
              const data = await response.json();
          
              this.listaObra = data;
          
            } catch (error) {
              console.error(error);
              throw error;
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
                throw error;
            }
        },
        async putInfoObra(obra : ObraInfo ) {
            try {
        
                const response = await fetch(`${baseUrl}/Obra/info?id=${obra.obraId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obra)
                });
        
                if (!response.ok) {
                    throw new Error('Fallo al actualizar la informacion.');
                }
        
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async putImgObra(obra : any ) {
            try {
        
                const objetoPut = {
                    obraId: obra.obraId,
                    imagen: obra.imagen
                }

                const response = await fetch(`${baseUrl}/Obra/img?id=${obra.obraId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objetoPut)
                });
        
                if (!response.ok) {
                    throw new Error('Fallo al actualizar la imagen.');
                }
        
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async deleteObra(idObra : number ) {
            try {
        
                const response = await fetch(`${baseUrl}/Obra?id=${idObra}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Fallo al eliminar la obra.');
                }
        
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async addObra(obra : any ) {
            try {
        
                const response = await fetch(`${baseUrl}/Obra`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obra)
                });
        
                if (!response.ok) {
                    throw new Error('Fallo al crear la obra.');
                }
        
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        setObraInfo(infoObra: ObraInfo) {
            this.infoObra = infoObra;
        }
    }

});