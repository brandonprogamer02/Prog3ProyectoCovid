using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_ConEntity.Models.Response
{
    public class Response
    {
        public int exito { get; set; }
        public string mensaje { get; set; }

        public object ls { get; set; }
        public Response()
        {
            this.exito = 0;
        }
    }
}
