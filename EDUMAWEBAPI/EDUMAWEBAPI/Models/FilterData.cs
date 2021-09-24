using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Models
{
    public class FilterData
    {
        public List<string> Categories { get; set; }
        public List<string> Instructors { get; set; }
        public string Price { get; set; }
    }
}
