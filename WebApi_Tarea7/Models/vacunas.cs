﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_Tarea7.Models
{
    public class vacunas
    {

        public vacunas()
        {
            vacunados = new HashSet<vacunados>();
        }
        public int id { get; set; }

        public string nombre { get; set; }

        public int provincia_id { get; set; }

        public virtual provincia provincia { get; set; }
        public virtual ICollection<vacunados> vacunados { get; set; }

    }
}
