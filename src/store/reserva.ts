import { defineStore } from 'pinia';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

export const useReserva = defineStore({
    id:"reservaInfo",
    state:() => ({
       listaReserva: [] as any[]
    }),
    actions: {

        async listaReservas (idUsuario : number) {
            try {
                const response = await fetch(`${baseUrl}/Reserva/usuario?id=${idUsuario}`);
        
            if (!response.ok) {
                throw new Error("No se pudo obtener data");
            }

            const data = await response.json();

            this.listaReserva = data

          } catch (error) {
            console.log(error);
            throw new Error( "El valor ya esta en Uso");
          }
          },
          async deleteReserva(idReserva: number)  {

            try {
        
                if (!idReserva) {
                    throw new Error('Error con la Optencion del ID.');
                }
        
                const response = await fetch(`${baseUrl}/Reserva?id=${idReserva}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Error del Servidor');
                }
                
            } catch (error) {
                console.error(error);
                throw new Error( "Fallo al Eliminar Reserva.");
            }
        },
        async crearReserva(reserva: any)  {

            try {
        
                const response = await fetch(`${baseUrl}/Reserva`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reserva)
                });
        
                if (!response.ok) {
                    throw new Error('Fallo al Hacer la reserva');
                }
                
            } catch (error) {
                console.error(error);
                throw new Error( "Fallo al Hacer Reserva.");
            }
        }
    }
})