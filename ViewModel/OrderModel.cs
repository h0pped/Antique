using Antique.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Antique.ViewModel
{
    public class OrderModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string City { get; set; }
        public string Number { get; set; }
        public string Delivery { get; set; }
        public string DeliveryNum { get; set; }
        public double TotalPrice { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
