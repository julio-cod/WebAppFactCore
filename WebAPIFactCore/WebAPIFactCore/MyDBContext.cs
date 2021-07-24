using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppFactCore.Models;
using WebAPIFactCore.Models.Entity;

namespace WebAPIFactCore
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options){}

        public DbSet<ProductoEntity> Productos { get; set; }
        public DbSet<UsuarioEntity> Usuarios { get; set; }
        public DbSet<VentaEntity> Ventas { get; set; }
        public DbSet<DetalleVentaEntity> DetalleVentas { get; set; }
        public DbSet<CategoriaEntity> Categorias { get; set; }

    }
}
