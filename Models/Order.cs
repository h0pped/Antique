using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Antique.Models
{

    [Table("tblOrders")]
    public class Order
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string City { get; set; }
        public string Number { get; set; }
        public string Delivery { get; set; }
        public string DeliveryNum { get; set; }
        public double TotalPrice { get; set; }
        public ICollection<OrderItem> Items { get; set; }
    }
}
