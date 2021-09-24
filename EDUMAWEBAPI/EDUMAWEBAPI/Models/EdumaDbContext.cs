using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Models
{
    public class EdumaDbContext : DbContext
    {
        public EdumaDbContext()
        {



        }
        public EdumaDbContext(DbContextOptions<EdumaDbContext> options) : base(options)
        {



        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"data source=(localdb)\MSSQLLocalDB; database=EDUMADatabase; integrated security=true");
            }
        }
        public DbSet<Event> Events { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<Course> Courses { get; set; }
        //public DbSet<Instructor> Instructors { get; set; }

    }
}
