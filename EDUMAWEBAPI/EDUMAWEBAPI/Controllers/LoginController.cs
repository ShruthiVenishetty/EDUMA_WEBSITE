using AuthenticationPlugin;
using EDUMAWEBAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        EdumaDbContext _context = new EdumaDbContext();
        private IConfiguration _configuration;
        private readonly AuthService _auth;
        public LoginController(IConfiguration configuration)
        {

            _configuration = configuration;
            _auth = new AuthService(_configuration);
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] Login login)
        {
            try
            {
                var userWithSameEmail = _context.Logins.Where(u => u.Email == login.Email).SingleOrDefault();
                if (userWithSameEmail != null)
                {
                    return BadRequest("User with this credentials already exists");
                }

                var userObj = new Login
                {

                    UserName = login.UserName,
                    Email = login.Email,
                    Password = SecurePasswordHasherHelper.Hash(login.Password)



                };
                _context.Logins.Add(userObj);
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }
        [HttpPost("Login")]
        public IActionResult Login([FromBody] Login login)
        {
            try
            {
                var userEmail = _context.Logins.FirstOrDefault(u => u.Email == login.Email);
                if (userEmail == null)
                {
                    return NotFound();
                }
                if (!SecurePasswordHasherHelper.Verify(login.Password, userEmail.Password))
                {
                    return NotFound();

                }
                var claims = new[]
                {
              new Claim(JwtRegisteredClaimNames.Email,userEmail.Email),
              new Claim(ClaimTypes.Email, userEmail.Email)

               };
                var token = _auth.GenerateAccessToken(claims);
                return new ObjectResult(new
                {
                    access_token = token.AccessToken,
                    expires_in = token.ExpiresIn,
                    token_type = token.TokenType,
                    creation_Time = token.ValidFrom,
                    expiration_Time = token.ValidTo

                });
            }
            catch(Exception)
            {
                return new StatusCodeResult(500);
            }


        }
    }
}
