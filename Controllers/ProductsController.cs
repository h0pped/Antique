using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Antique.Models;
using Antique.Context;

namespace antique_store.Controllers
{
    [Route("api/Products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly CTX _context;

        public ProductsController(CTX context)
        {
            _context = context;
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
                Category = new
                {
                    p.Category.Name,
                    p.Category.ID
                },
                Photos = p.Photos.Select(x => new
                {
                    x.ID,
                    x.Path
                }),
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
                Category = new
                {
                    p.Category.Name,
                    p.Category.ID
                },
                Photos = p.Photos.Select(x => new
                {
                    x.ID,
                    x.Path
                }),
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
                return null;
            }

        }
        [HttpPut]
        [Route("add")]
        public Product AddProduct(Product product)
        {
            return null;
        }

    }
}