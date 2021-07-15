using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_Tarea7.Models
{
    public class provincia
    {
        public provincia()
        {
            vacunas = new HashSet<vacunas>();
        }
        public int id { get; set; }
        public string nombre { get; set; }

        public virtual ICollection<vacunas> vacunas { get; set; }
    }
}
