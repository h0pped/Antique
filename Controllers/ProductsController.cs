using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Antique.Models;
using Antique.Context;
using Antique.ViewModel;
using static System.Net.Mime.MediaTypeNames;
using System.IO;
using Antique.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

namespace antique_store.Controllers
{
    [Route("api/Products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly CTX _context;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;


        public ProductsController(CTX context, IHostingEnvironment env, IConfiguration configuration)
        {
            _context = context;
            this._configuration = configuration;
            this._env = env;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetProducts()
        {
           var model = _context.Products.Select(p => new
            {
                p.ID,
                p.Name,
                p.Price,
                p.Description,
                p.Category,
                p.Photos
            });


            return Ok(model.ToList());

        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            //return _context.Products.Include("Photos").FirstOrDefault(x=>x.ID == id);
            var model = _context.Products.Select(p => new
            {
                p.ID,
                p.Name,
                p.Price,
                p.Description,
                p.Category,
                p.Photos
            }).FirstOrDefault(x => x.ID == id);
            if (model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }

        [HttpGet("GetByCategory/{category}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategory(string category)
        {
            //List<Product> products = await _context.Products.Include("Category").Where(x => x.Category.Name == category).Include("Photos").ToListAsync();

            var model = _context.Products.Select(p => new
            {
                p.ID,
                p.Name,
                p.Price,
                p.Description,
                p.Category,
                p.Photos
            }).Where(x => x.Category.Name == category);


            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public ActionResult DeleteProduct(int id)
        {
            Product dproduct = _context.Products.Include("Photos").FirstOrDefault(x => x.ID == id);
            if (dproduct != null)
            {
                _context.Products.Remove(dproduct);
                _context.SaveChanges();
                return Ok();

            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("add")]
        public async Task<ActionResult<Product>> AddProduct([FromBody] ProductModel product)
        {
            Product p;
            try
            {
                List<Photo> added_photos = new List<Photo>();
                foreach(var photo in product.ImgsBase64)
                {

                    string imageName = Path.GetRandomFileName() + ".jpg";

                    string pathSaveImages = InitStaticFiles
                               .CreateImageByFileName(_env, _configuration,
                                    new string[] { "ImagesPath", "ImagesPathProduct" },
                                    imageName,
                                    photo);
                    added_photos.Add(new Photo
                    {
                        Path = imageName
                    });

                }
                p = new Product
                {
                    Name = product.Name,
                    Category = _context.Categories.FirstOrDefault(x => x.Name == product.Category),
                    Description = product.Description,
                    Price = product.Price,
                    Photos = added_photos
                };
                _context.Products.Add(p);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return p;
        }

    }
}