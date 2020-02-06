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
            /*_context.Products.Add(new Product
            {
                Name = "Комод Дубовый",
                Description = "Комод виполненный в стиле Бретон, дубовый",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Комоды"),
                Price = 14500,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Commode.png"
                    },
                    new Photo
                    {
                        Path="Commode2.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Комод Бельгия",
                Description = "Комод с резьбой 151*50см, высота 84см. Дуб. В хорошем состоянии.",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Комоды"),
                Price = 4200,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Commode-belgium1.png"
                    },
                    new Photo
                    {
                        Path="Commode-belgium2.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Комод Бар",
                Description = "Комод 120*50см, высота 148см. Резьба. В хорошем состоянии.",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Комоды"),
                Price = 4200,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Commode-bar1.png"
                    },
                    new Photo
                    {
                        Path="Commode-bar2.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Часы с боем",
                Description = "Часы с боем (лошадка). 95*32см-3200грн. Рабочие. В хорошем состоянии.",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Часы"),
                Price = 3200,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Watches1.png"
                    },
                    new Photo
                    {
                        Path="Watches1.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Часы настенные. Германия.",
                Description = "Часы настенные.110*30см. Приятный негромкий бой. Германия Рабочие",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Часы"),
                Price = 4700,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Clock1.png"
                    },
                    new Photo
                    {
                        Path="Clock2.png"
                    },
                    new Photo
                    {
                        Path="Clock3.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Стол обеденный + 6 стульев . Дуб.",
                Description = "Стол дубовый обеденный 210*90см, высота 76см.(разборный) + 6 дубовых стульев .",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Столы и стулья"),
                Price = 4700,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Table1.png"
                    },
                    new Photo
                    {
                        Path= "Table2.png"
                    },
                    new Photo
                    {
                        Path="Table3.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Креденс, буфет, сервант. Франция",
                Description = "Антикварный буфет, которому приблизительно 130 лет.135*55см, высота 255см. Франция. В хорошем состоянии, реставрации не требует. ",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Комоды"),
                Price = 18000,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="kredens1.png"
                    },
                    new Photo
                    {
                        Path= "kredens2.png"
                    },
                    new Photo
                    {
                        Path="kredens3.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Часы с боем в дубовом каркасе. Германия.",
                Description = "Часы в дубовом корпусе с боем. 110*30см. Рабочие. В хорошем состоянии. Высылаю по Украине. Смотрите все мои объявления.",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Часы"),
                Price = 3500,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Clockboi1.png"
                    },
                    new Photo
                    {
                        Path= "Clockboi2.png"
                    },
                    new Photo
                    {
                        Path="Clockboi3.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Часы каминные с боем + 2 канделябра. Бронза. Италия.",
                Description = "Часы (бронза) с боем 60х35см, подсвечники на 6 свечей 70см В отличном состоянии. Рабочие.",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Часы"),
                Price = 15500,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Clockkamin1.png"
                    },
                    new Photo
                    {
                        Path= "Clockkamin2.png"
                    },
                    new Photo
                    {
                        Path="Clockkamin3.png"
                    }
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Картина",
                Description = "Картина написана маслом на полотне.45 * 35см - 400грн",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Разное"),
                Price = 400,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="Image.png"
                    },
                }
            });
            _context.Products.Add(new Product
            {
                Name = "Навесной шкафчик. Голландия",
                Description = "Дубовый навесной шкафчик 62*17см, высота 60см. В хорошем состоянии. ",
                Category = _context.Categories.FirstOrDefault(x => x.Name == "Разное"),
                Price = 1800,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Path="shkaf4ik1.png"
                    },
                    new Photo
                    {
                        Path="shkaf4ik2.png"
                    }
                }
            });
            await _context.SaveChangesAsync(); */
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
                return null;
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