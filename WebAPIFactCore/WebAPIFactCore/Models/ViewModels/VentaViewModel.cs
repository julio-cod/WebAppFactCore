using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFactCore.Models.ViewModels
{
    public class VentaViewModel
    {
        public int IdVentas { get; set; }
        public string Fecha { get; set; }
        public decimal Total { get; set; }
        public decimal TotalGanancia { get; set; }
    }
}
