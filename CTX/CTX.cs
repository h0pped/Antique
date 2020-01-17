using Antique.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Antique.Context
{
    public class CTX : IdentityDbContext<User>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Category> Categories { get; set; }
        public CTX(DbContextOptions<CTX> options) : base(options)
        {
            //Database.EnsureCreated();
        }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderItem> Items { get; set; }
    }
}
