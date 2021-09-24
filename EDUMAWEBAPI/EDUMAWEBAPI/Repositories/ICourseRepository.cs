using EDUMAWEBAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Repositories
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllCourses();
        Task<Course> GetCourseById(int id);
        Task InsertCourse(Course courseDetails);
        Task<List<Course>> GetCourseByCategory(string categoryName);
        Task<List<Course>> GetByFilter(FilterData filter);
        Task<List<CategoryDetails>> GetAllCategoryNames();
        Task<List<InstructorDetails>> GetAllInstructorNames();

    }
}
