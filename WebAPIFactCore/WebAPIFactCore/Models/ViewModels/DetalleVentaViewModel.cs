using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFactCore.Models.ViewModels
{
    public class DetalleVentaViewModel
    {
        public int IdDetalleVentas { get; set; }
        public int IdVenta { get; set; }
        public int IdProducto { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Precio { get; set; }
        public decimal Ganancia { get; set; }
    }
}
