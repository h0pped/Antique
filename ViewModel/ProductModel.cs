using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Antique.ViewModel
{
    public class ProductModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double Price{ get; set; }
        public List<string> ImgsBase64 { get; set; }
    }
}
