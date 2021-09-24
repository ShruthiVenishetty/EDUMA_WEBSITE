using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Models
{
    public class EdumaException : Exception
    {
        public EdumaException(string errmsg) : base(errmsg)
        {

        }
    }
}
