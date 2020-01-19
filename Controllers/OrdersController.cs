using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Antique.Context;
using Antique.Models;
using Antique.ViewModel;

namespace Antique.Controllers
{
    [Produces("application/json")]
    [Route("api/Orders")]
    public class OrdersController : ControllerBase
    {
        private readonly CTX _context;

        public OrdersController(CTX context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Order.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")] 
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.ID)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody]OrderModel order)
        {

            Order o;
            try
            {
                List<OrderItem> products = new List<OrderItem>();
                foreach (var x in order.Products)
                {
                    OrderItem a = new OrderItem
                    {
                        Product = _context.Products.FirstOrDefault(p => p.ID == x.ID),
                        ProductId = _context.Products.FirstOrDefault(p => p.ID == x.ID).ID
                    };
                    products.Add(a);
                }

                o = new Order
                {
                    Name = order.Name,
                    Surname = order.Surname,
                    City = order.City,
                    Delivery = order.Delivery,
                    DeliveryNum = order.DeliveryNum,
                    Number = order.Number,
                    TotalPrice = order.TotalPrice,
                    Items = products
                    
                };
                _context.Order.Add(o);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return o;
            /*_context.Order.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.ID }, order);*/
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.ID == id);
        }
    }
}
