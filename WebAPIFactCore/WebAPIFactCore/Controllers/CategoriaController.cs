using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPIFactCore.Models.ViewModels;

namespace WebAPIFactCore.Controllers
{
    [Route("api/categorias")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private MyDBContext db;
        private readonly IWebHostEnvironment _env;
        public string localhostImg = "https://localhost:44337/Imagenes/";
        public CategoriaController(MyDBContext context, IWebHostEnvironment env)
        {
            db = context;
            _env = env;
        }

        //[Authorize]
        [HttpGet]
        [Route("listadocategorias")]
        public IEnumerable<CategoriaViewModel> ListadoCategorias()
        {
            List<CategoriaViewModel> lst = (from d in db.Categorias
                                           select new CategoriaViewModel
                                           {
                                               IdCategoria = d.IdCategoria,
                                               NombreCategoria = d.NombreCategoria
                                           }).ToList();

            return lst;
        }

    }
}
