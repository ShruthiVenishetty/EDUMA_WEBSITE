using EDUMAWEBAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly EdumaDbContext db;
        public CourseRepository(EdumaDbContext edumadbcontext)
        {
            db = edumadbcontext;
        }
        public async Task<List<CategoryDetails>> GetAllCategoryNames()
        {
            try
            {
                List<CategoryDetails> categoryDetails = new List<CategoryDetails>();
                List<string> names = await (from course in db.Courses select course.Categories).Distinct().ToListAsync();
                foreach(string name in names)
                {
                    List<Course> courses = await(from c in db.Courses where c.Categories == name select c).ToListAsync();
                    CategoryDetails details = new CategoryDetails()
                    {
                        CategoryName = name,
                        CategoryCount = courses.Count()
                    };
                    categoryDetails.Add(details);
                }
                return categoryDetails;
            }
            catch (Exception)
            {
                throw new EdumaException("Error while retrieving Category Names");
            }
        }

        public async Task<List<Course>> GetAllCourses()
        {
            try
            {
                return await db.Courses.ToListAsync();
            }
            catch (Exception)
            {
                throw new EdumaException("Error while retrieving all Course");
            }
        }

        public async Task<List<InstructorDetails>> GetAllInstructorNames()
        {
            try
            {
                List<InstructorDetails> instructorDetails = new List<InstructorDetails>();
                List<string> names = await(from course in db.Courses select course.InstructorName).Distinct().ToListAsync();
                foreach (string name in names)
                {
                    List<Course> courses = await (from c in db.Courses where c.InstructorName == name select c).ToListAsync();
                    InstructorDetails details = new InstructorDetails()
                    {
                        InstructorName = name,
                        InstructorCount = courses.Count()
                    };
                    instructorDetails.Add(details);
                }
                return instructorDetails;
            }
            catch (Exception)
            {
                throw new EdumaException("Error while retrieving Instructor Names");
            }
        }

        public async Task<List<Course>> GetByFilter(FilterData filter)
        {
            try
            {
                List<Course> filteredCourse = new List<Course>();           
                if (filter.Price == "All" || filter.Price == null)
                {
                    filteredCourse = await db.Courses.ToListAsync();
                }
                else if (filter.Price == "Paid")
                {
                        filteredCourse = await db.Courses.Where(course=>course.ActualPrice !=0).ToListAsync();
                }
                else if (filter.Price == "Free")
                {
                        filteredCourse = await db.Courses.Where(course => course.ActualPrice == 0).ToListAsync();
                }


                List<Course> listOfCourses = new List<Course>();
                if (filter.Categories.Count == 0 && filter.Instructors.Count != 0)
                {
                    listOfCourses =  filteredCourse.Where(course => filter.Instructors.Any(c => c == course.InstructorName)).ToList();
                }
                else if (filter.Instructors.Count == 0 && filter.Categories.Count != 0)
                {
                    listOfCourses =  filteredCourse.Where(course => filter.Categories.Any(c => c == course.Categories)).ToList();
                }
                else if (filter.Instructors.Count != 0 && filter.Categories.Count != 0)
                {
                    listOfCourses =  filteredCourse.Where(course => filter.Instructors.Any(c => c == course.InstructorName)).Where(course => filter.Categories.Any(c => c == course.Categories)).ToList();
                }
                else
                {
                    listOfCourses.AddRange(filteredCourse);
                }

                return listOfCourses;
                
            }
            catch (Exception)
            {
                throw new EdumaException("Error while performing Filters");
            }
        }

        public async Task<List<Course>> GetCourseByCategory(string categoryName)
        {
            try
            {
                List<Course> courses = await(from c in db.Courses where c.Categories == categoryName select c).ToListAsync();
                return courses;
            }
            catch (Exception)
            {
                throw new EdumaException("Error while retrieving Courses by category");
            }
        }

        public async Task<Course> GetCourseById(int id)
        {
            try
            {
                Course course = await (from c in db.Courses where c.CourseId == id select c).FirstOrDefaultAsync();
                return course;
            }
            catch (Exception)
            {
                throw new EdumaException("Error while retrieving Course by Id");
            }

        }

        public async Task InsertCourse(Course courseDetails)
        {
            try
            {
                await db.Courses.AddAsync(courseDetails);
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new EdumaException("Error while adding Course");
            }
        }
    }
}
