import { defineStore } from 'pinia';
import urlStore from '@/store/urlApi';

const baseUrl: string = urlStore.baseUrl;

export const useInfoAsientos = defineStore('infoAsientos', {
  state: () => ({
    asientos: [] as any[],
    butacasSeleccionadas: [] as any[],
  }),
  actions: {
    async butacaEspecifica(butacaId: number) {
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

        this.butacaSelecionada(butaca);

      } catch (error) {
        console.error('Error al obtener la butaca:', error);
        throw error;
      }
    },
    async listButacasObra(idObra: number) {
      try {

        this.butacasSeleccionadas = []

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
        throw error;
      }
    },
    async allButacas() {
      try {
        const response = await fetch(`${baseUrl}/Asiento`);
        if (!response.ok) {
          throw new Error('Fallo al obtener la lista de butacas.');
        }
        const data = await response.json();
        this.setAsientos(data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async deleteButaca(butacaId: number) {
      try {
        const response = await fetch(`${baseUrl}/Asiento?id=${butacaId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error del Servidor');
        }

        const index = this.asientos.findIndex((butaca: any) => butaca.asientoId === butacaId);
        if (index !== -1) {
          this.asientos.splice(index, 1);
        }

        await this.allButacas();

        return true;

      } catch (error) {
        console.error(error);
        throw new Error('Fallo al Eliminar Butaca.');
        
      }
    },
    async addButaca(nombre: string, estado: boolean) {
      try {
        const crear = {
            nombreAsiento: nombre,
            estado: estado
        };

        const response = await fetch(`${baseUrl}/Asiento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crear)
        });

        if (!response.ok) {
            throw new Error('Fallo al crear Butaca.');
        }

        await this.allButacas();

        return true;  

      } catch (error) {
        console.error(error);
        throw new Error('Ha ocurrido un Error al Crear Butaca Pinia.');
      }
    },
    butacaSelecionada(butaca: any) {
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
