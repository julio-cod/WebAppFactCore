using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFactCore.Models.Entity
{
    public class VentaEntity
    {
        [Key]
        public int IdVentas { get; set; }
        public string Fecha { get; set; }
        public decimal Total { get; set; }
        public decimal TotalGanancia { get; set; }
    }
}
