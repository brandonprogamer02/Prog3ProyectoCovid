using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_Tarea7.Models
{
    public class vacunados
    {

        public int id { get; set; }
        public int vacuna_id { get; set; }

        public int paciente_id { get; set; }
        public DateTime fecha_vacunacion { get; set; }
        public virtual pacientes pacientes { get; set; }
        public virtual vacunas vacunas { get; set; }

    }
}
