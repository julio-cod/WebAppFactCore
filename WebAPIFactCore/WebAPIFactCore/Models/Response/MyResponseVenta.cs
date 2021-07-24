using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFactCore.Models.Response
{
    public class MyResponseVenta
    {
        public int Success { get; set; }
        public string Message { get; set; }
        public int IdVenta { get; set; }
    }
}
