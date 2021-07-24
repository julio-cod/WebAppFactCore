using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPIFactCore.Models.Entity;
using WebAPIFactCore.Models.Response;
using WebAPIFactCore.Models.ViewModels;

namespace WebAPIFactCore.Controllers
{
    [Route("api/ventas")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        private MyDBContext db;
        private readonly IWebHostEnvironment _env;
        public string localhostImg = "https://localhost:44337/Imagenes/";
        public VentasController(MyDBContext context, IWebHostEnvironment env)
        {
            db = context;
            _env = env;
        }

        //[Authorize]
        [HttpPost("[action]")]
        public MyResponseVenta AgregarVenta([FromBody] VentaViewModel model)
        {
            MyResponseVenta oR = new MyResponseVenta();


            VentaEntity venta = new VentaEntity();
            venta.Fecha = model.Fecha;
            venta.Total = model.Total;
            venta.TotalGanancia = model.TotalGanancia;
            db.Add(venta);
            db.SaveChanges();


            oR.Success = 1;
            oR.Message = "Exito!";
            oR.IdVenta = venta.IdVentas;

            try
            {

                
            }
            catch (Exception ex)
            {
                oR.Success = 0;
                oR.Message = ex.Message;


            }

            return oR;

        }

        //[Authorize]
        [HttpPost("[action]")]
        public MyResponse AgregarDetalleVenta([FromBody] IList<DetalleVentaViewModel> model)
        {
            MyResponse oR = new MyResponse();
            //var ObjMovmientos = JsonConvert.DeserializeObject<List<DetalleVentaViewModel>>(model.ToString());


            foreach (var data in model)
            {

                DetalleVentaEntity detalle = new DetalleVentaEntity();
                detalle.IdVenta = data.IdVenta;
                detalle.IdProducto = data.IdProducto;
                detalle.Descripcion = data.Descripcion;
                detalle.Cantidad = data.Cantidad;
                detalle.Fecha = data.Fecha;
                detalle.Precio = data.Precio;
                detalle.Ganancia = data.Ganancia;
                db.Add(detalle);
                db.SaveChanges();

            }

            
            oR.Success = 1;
            oR.Message = "Detalle de Venta agregado";

            try
            {


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
