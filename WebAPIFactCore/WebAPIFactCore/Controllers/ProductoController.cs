using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAppFactCore.Models.ViewModels;
using System.IO;
using WebAppFactCore.Models;
using WebAPIFactCore.Models.Response;

namespace WebAPIFactCore.Controllers
{
    [Route("api/productos")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private MyDBContext db;
        private readonly IWebHostEnvironment _env;
        public string localhostImg = "https://localhost:44337/Imagenes/";
        public ProductoController(MyDBContext context, IWebHostEnvironment env)
        {
            db = context;
            _env = env;
        }

        //[Authorize]
        [HttpGet]
        [Route("listadoproductos")]
        public IEnumerable<ProductoViewModel> ListadoProducto()
        {
            List<ProductoViewModel> lst = (from d in db.Productos
                                           select new ProductoViewModel
                                           {
                                               IdProducto = d.IdProducto,
                                               Descripcion = d.Descripcion,
                                               Categoria = d.Categoria,
                                               Stock = d.Stock,
                                               Costo = d.Costo,
                                               Precio = d.Precio,
                                               Imagen = Path.Combine(localhostImg, d.Imagen)
                                               //Imagen = Path.Combine(_env.ContentRootPath, "Imagenes/", d.Imagen)
                                               //Imagen = Path.Combine(_env.WebRootPath,"Imagenes/", d.Imagen)
                                               //Imagen = Path.Combine(@"https://localhost:44337/Imagenes/", d.Imagen)
                                           }).ToList();

            return lst;
        }

        //[Authorize]
        [HttpPost("[action]")]
        public MyResponse AgregarProducto([FromBody] ProductoViewModel model)
        {
            MyResponse oR = new MyResponse();
            try
            {
                string guidImagen = null;
                guidImagen = Guid.NewGuid().ToString() + model.Imagen;

                ProductoEntity producto = new ProductoEntity();
                producto.Descripcion = model.Descripcion;
                producto.Categoria = model.Categoria;
                producto.Stock = model.Stock;
                producto.Costo = model.Costo;
                producto.Precio = model.Precio;
                producto.Imagen = guidImagen;
                db.Add(producto);
                db.SaveChanges();
                oR.Success = 1;
                oR.Message = guidImagen;
            }
            catch (Exception ex)
            {
                oR.Success = 0;
                oR.Message = ex.Message;


            }

            return oR;

        }

        //[Authorize]
        [HttpGet]
        [Route("{action}/{id?}")]
        public IActionResult BuscarProductoId(int id)
        {
            var producto = db.Productos.Find(id);

            if (producto == null)
            {
                return NotFound();
            }

            producto.Imagen = localhostImg + producto.Imagen;

            //return Json(producto);
            return Ok(producto);
        }

        //[Authorize]
        [HttpPut("[action]")]
        public MyResponse EditarProducto([FromBody] ProductoViewModel model)
        {
            MyResponse oR = new MyResponse();
            string imgActual = "";
            string guidImagen = "";
            try
            {

                if (model.Imagen == "misma img")
                {
                    imgActual = BuscarImagenActual(model.IdProducto);
                }
                else
                {
                    guidImagen = null;
                    guidImagen = Guid.NewGuid().ToString() + model.Imagen;
                }

                ProductoEntity producto = new ProductoEntity();
                producto.IdProducto = model.IdProducto;
                producto.Descripcion = model.Descripcion;
                producto.Categoria = model.Categoria;
                producto.Stock = model.Stock;
                producto.Costo = model.Costo;
                producto.Precio = model.Precio;
                if (model.Imagen == "misma img")
                {
                    producto.Imagen = imgActual;
                }
                else
                {
                    producto.Imagen = guidImagen;
                }
                db.Productos.Update(producto);
                db.SaveChanges();
                oR.Success = 1;
                oR.Message = guidImagen;
            }
            catch (Exception ex)
            {
                oR.Success = 0;
                oR.Message = ex.Message;


            }

            return oR;

        }

        //[Authorize]
        [HttpDelete("{action}/{id?}")]
        public MyResponse EliminarProducto(int id)
        {
            MyResponse oR = new MyResponse();
            try
            {
                ProductoEntity producto = new ProductoEntity();
                producto.IdProducto = id;
                db.Productos.Remove(producto);
                db.SaveChanges();
                oR.Success = 1;
            }
            catch (Exception ex)
            {
                oR.Success = 0;
                oR.Message = ex.Message;

            }

            return oR;

        }

        public string BuscarImagenActual(int id)
        {
            var imgActual = db.Productos.Find(id);

            //return Json(producto);
            return imgActual.Imagen;
        }


        [HttpPost("[action]")]
        public MyResponse SubirArchivo(IFormFile files)
        {
            MyResponse oR = new MyResponse();

            try
            {
                //string guidImagen = null;
                if (files != null)
                {
                    string ficherosImagenes = Path.Combine("wwwroot/Imagenes");
                    //guidImagen = Guid.NewGuid().ToString() + files.FileName;
                    string rutaDefinitiva = Path.Combine(ficherosImagenes, files.FileName);
                    files.CopyTo(new FileStream(rutaDefinitiva, FileMode.Create));
                    oR.Success = 1;
                    oR.Message = "Imagen subida";
                }
                else
                {
                    oR.Success = 0;
                    oR.Message = "Ninguna imagen seleccionada";
                }

            }
            catch (Exception ex)
            {
                oR.Success = 0;
                oR.Message = ex.Message;

            }

            return oR;

        }



    }

}
