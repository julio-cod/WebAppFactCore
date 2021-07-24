﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFactCore.Models
{
    public class ProductoEntity
    {
        [Key]
        public int IdProducto { get; set; }
        public string Descripcion { get; set; }
        public string Categoria { get; set; }
        public int Stock { get; set; }
        public decimal Costo { get; set; }
        public decimal Precio { get; set; }
        public string Imagen { get; set; }

    }
}
