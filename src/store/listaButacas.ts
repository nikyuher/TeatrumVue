import { defineStore } from 'pinia';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

export const useInfoAsientos = defineStore('infoAsientos', {
  state: () => ({
    asientos: [] as any[], // Puedes definir aquí tus estados iniciales
    butacasSeleccionadas: [] as any[],
  }),
  actions: {
    async Butaca(butacaId: number) {
      try {
        const response = await fetch(`${baseUrl}/Asiento/${butacaId}`);

        if (!response.ok) {
          throw new Error('No se pudo obtener la data');
        }

        const data = await response.json();

        const butaca = {
          asientoId: data.asientoId,
          nombreAsiento: data.nombreAsiento,
          estado: data.estado
        };

        this.infoButaca(butaca);

      } catch (error) {
        console.error('Error al obtener la butaca:', error);
      }
    },
    async listaAsientos(idObra: number) {
      try {
        const responseAsientos = await fetch(`${baseUrl}/Asiento/disponible?estado=false`);
        const responseObra = await fetch(`${baseUrl}/Obra/${idObra}/asientos`);

        if (!responseAsientos.ok || !responseObra.ok) {
          throw new Error("No se pudo obtener data");
        }

        const dataAsientos = await responseAsientos.json();
        const dataObra = await responseObra.json();

        dataObra.asientosOcupados.forEach((obraAsiento: any) => {
          const index = dataAsientos.findIndex((asiento: any) => asiento.nombreAsiento === obraAsiento.nombreAsiento);
          if (index !== -1) {
            dataAsientos[index].estado = obraAsiento.estado;
          }
        });

        this.setAsientos(dataAsientos);

      } catch (error) {
        console.log('Error al cargar las butacas', error)
      }
    },
    infoButaca(butaca: any) {
      const index = this.butacasSeleccionadas.findIndex(b => b.asientoId === butaca.asientoId);
      if (index === -1) {
        this.butacasSeleccionadas.push({ ...butaca, cantidad: 1 });
      } else {
        this.butacasSeleccionadas.splice(index, 1);
      }
    },
    setAsientos(nuevosAsientos: any[]) {
      this.asientos = nuevosAsientos;
    },
  },
});
