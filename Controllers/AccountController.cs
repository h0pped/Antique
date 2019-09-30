using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Antique.Models;
using Antique.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Antique.Controllers
{

    [Produces("application/json")]
    [Route("api/Account")]

    public class AccountController : Controller
    {
            private readonly UserManager<User> _userManager;
            private readonly SignInManager<User> _signInManager;

            public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
            {
                _userManager = userManager;
                _signInManager = signInManager;
            }
        [Route("")]
        [HttpGet]
            public IActionResult Register()
            {
            return Ok();
            }

        [HttpPost("add")]
            public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
            {
                if (ModelState.IsValid)
                {
                    User user = new User { UserName = model.UserName};
                    // добавляем пользователя
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (result.Succeeded)
                    {
                        // установка куки
                        await _signInManager.SignInAsync(user, false);
                    return Ok(user);
                }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                        return BadRequest();
                        }
                    }
                }
                return NotFound();
        }
        }
    
}