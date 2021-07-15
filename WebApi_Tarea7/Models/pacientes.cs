using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_Tarea7.Models
{
    public class pacientes
    {

        public pacientes()
        {
            vacunados = new HashSet<vacunados>();
        }

        public int id { get; set; }
        public int cedula { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string telefono { get; set; }
        public DateTime fecha_nacimiento { get; set; }


        public virtual ICollection<vacunados> vacunados { get; set; }

    }
}
