using EDUMAWEBAPI.Models;
using EDUMAWEBAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EDUMAWEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository courseRepository;
        public CoursesController(ICourseRepository icourseRepository)
        {
            courseRepository = icourseRepository;
        }
        // GET: api/<CoursesController>
        [HttpGet]
        public async Task<ActionResult<List<Course>>> Get()
        {
            try
            {
                List<Course> courses = await courseRepository.GetAllCourses();
                if (courses.Count != 0)
                {
                    return Ok(courses);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }

        // GET api/<CoursesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetByCourseId(int id)
        {
            try
            {
                Course course = await courseRepository.GetCourseById(id);
                if (course.CourseId != 0)
                {
                    return Ok(course);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }
        [HttpGet("Category/{categoryName}")]
        public async Task<ActionResult<List<Course>>> GetByCategoryName(string categoryName)
        {
            try
            {
                List<Course> courses = await courseRepository.GetCourseByCategory(categoryName);
                if (courses.Count != 0)
                {
                    return Ok(courses);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }

        // POST api/<CoursesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Course courseDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please enter Correct Details");
            }
            try
            {
                await courseRepository.InsertCourse(courseDetails);
                return Ok("Successfully Inserted Course Details");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("Filters")]
        public async Task<ActionResult<List<Course>>> GetByFilters(FilterData filterData)
        {
            try
            {
                
                List<Course> courses = await courseRepository.GetByFilter(filterData);
                if (courses.Count != 0)
                {
                    return Ok(courses);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }
        [HttpGet("AllCategoryName")]
        public async Task<ActionResult<List<CategoryDetails>>> GetAllCategoryName()
        {
            try
            {
                List<CategoryDetails> categoryNames = await courseRepository.GetAllCategoryNames();
                if (categoryNames.Count != 0)
                {
                    return Ok(categoryNames);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }
        [HttpGet("AllInstructorNames")]
        public async Task<ActionResult<List<InstructorDetails>>> GetAllInstructorName()
        {
            try
            {
                List<InstructorDetails> instructorNames = await courseRepository.GetAllInstructorNames();
                if (instructorNames.Count != 0)
                {
                    return Ok(instructorNames);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }



    }
}
