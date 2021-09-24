using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI
{
    public class Login
    {
        [Key]
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
