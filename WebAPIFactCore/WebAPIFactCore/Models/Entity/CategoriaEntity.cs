using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFactCore.Models.Entity
{
    public class CategoriaEntity
    {
        [Key]
        public int IdCategoria { get; set; }
        public string NombreCategoria { get; set; }
    }
}
