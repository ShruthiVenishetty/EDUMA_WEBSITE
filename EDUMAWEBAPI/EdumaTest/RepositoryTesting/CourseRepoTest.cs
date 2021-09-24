using EDUMAWEBAPI.Models;
using EDUMAWEBAPI.Repositories;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EdumaTest.RepositoryTesting
{
    public class CourseRepoTest
    {

        DbContextOptions<EdumaDbContext> options = new DbContextOptionsBuilder<EdumaDbContext>().UseInMemoryDatabase(databaseName: "MockEDUMADatabase").Options;
        private EdumaDbContext fakeEdumaContext;
        private CourseRepository courseRepository;
        [SetUp]
        public void Setup()
        {
            fakeEdumaContext = new EdumaDbContext(options);
            fakeEdumaContext.Courses.AddRange(GetCourses());
            fakeEdumaContext.SaveChanges();
            courseRepository = new CourseRepository(fakeEdumaContext);
        }
        private static List<Course> GetCourses()
        {
            List<Course> fakeCourses = new List<Course> {
                new Course {CourseId=100, ImageUrl = "Test1 ImageUrl",ProfilePicUrl="Test1 ProfileUrl",CommentsCount=10,DiscountedPrice=0,ActualPrice=0,Categories="Test1 Category",ReviewCount=5,LecturesCount=4,Quizzes=5,DurationInHours=9,SkillLevel="Test1 skill Level",Language="Test1 language",Assessments=true,Certificate=true,InstructorName="Test1 InstructorName",CourseName="Test1 CourseName",StudentCount=10},
                new Course {CourseId=101, ImageUrl = "Test2 ImageUrl",ProfilePicUrl="Test2 ProfileUrl",CommentsCount=12,DiscountedPrice=5,ActualPrice=7,Categories="Test2 Category",ReviewCount=4,LecturesCount=8,Quizzes=9,DurationInHours=9,SkillLevel="Test2 skill Level",Language="Test2 language",Assessments=true,Certificate=false,InstructorName="Test2 InstructorName",CourseName="Test2 CourseName",StudentCount=12},
                  new Course {CourseId=102, ImageUrl = "Test3 ImageUrl",ProfilePicUrl="Test3 ProfileUrl",CommentsCount=10,DiscountedPrice=0,ActualPrice=0,Categories="Test1 Category",ReviewCount=5,LecturesCount=4,Quizzes=5,DurationInHours=9,SkillLevel="Test3 skill Level",Language="Test3 language",Assessments=true,Certificate=true,InstructorName="Test2 InstructorName",CourseName="Test3 CourseName",StudentCount=10},
                new Course {CourseId=103, ImageUrl = "Test4 ImageUrl",ProfilePicUrl="Test4 ProfileUrl",CommentsCount=12,DiscountedPrice=5,ActualPrice=7,Categories="Test2 Category",ReviewCount=4,LecturesCount=8,Quizzes=9,DurationInHours=9,SkillLevel="Test4 skill Level",Language="Test4 language",Assessments=true,Certificate=false,InstructorName="Test1 InstructorName",CourseName="Test4 CourseName",StudentCount=12},

                };
            return fakeCourses;
        }

        [Test]
        public async Task GetAllCourses_Pass_Test()
        {           
                List<Course> coursesList = await courseRepository.GetAllCourses();
                Assert.AreEqual(4, coursesList.Count);           
        }
        [TestCase(101)]
        [TestCase(102)]
        public async Task GetCourseById_Pass_Test(int courseid)
        {     
                Course coursedetails = await courseRepository.GetCourseById(courseid);
                Assert.AreEqual(courseid, coursedetails.CourseId);           
        }
        [Test]
        public async Task GetCourseByCategoryName_Pass_Test()
        {
                List<Course> coursesdetails = await courseRepository.GetCourseByCategory("Test1 Category");
                Assert.AreEqual(2, coursesdetails.Count);     
        }
        [Test]
        public async Task GetAllCategoryNames_Pass_Test()
        {
                List<CategoryDetails> categoriesList = await courseRepository.GetAllCategoryNames();
                Assert.AreEqual(2, categoriesList.Count);          
        }

        [Test]
        public async Task GetAllInstructorNames_Pass_Test()
        {
                List<InstructorDetails> instructorsList = await courseRepository.GetAllInstructorNames();
                Assert.AreEqual(2, instructorsList.Count);          
        }
        [Test]
        public async Task GetByFilter_Pass_Test()
        {
            FilterData filterData = new FilterData() { Categories = new List<string> { "Test1 Category" }, Instructors = new List<string> { "Test1 InstructorName" }, Price = "All" };
            List<Course> coursesFilterDetails = await courseRepository.GetByFilter(filterData);
            Assert.AreEqual(1, coursesFilterDetails.Count); ;
        }
        [Test]
        public async Task InsertCourse_Pass_Test()
        {
            Course courseDetails = new Course { CourseId = 105, ImageUrl = "Test1 ImageUrl", ProfilePicUrl = "Test1 ProfileUrl", CommentsCount = 10, DiscountedPrice = 0, ActualPrice = 0, Categories = "Test1 Category", ReviewCount = 5, LecturesCount = 4, Quizzes = 5, DurationInHours = 9, SkillLevel = "Test1 skill Level", Language = "Test1 language", Assessments = true, Certificate = true, InstructorName = "Test1 InstructorName", CourseName = "Test1 CourseName", StudentCount = 10 };
            var beforeCount = fakeEdumaContext.Courses.ToList().Count;
            await courseRepository.InsertCourse(courseDetails);
            var afterCount = fakeEdumaContext.Courses.ToList().Count;
            Assert.AreEqual(beforeCount + 1, afterCount);
        }

        [TearDown]
        public void TearDown()
        {
            fakeEdumaContext.Database.EnsureDeleted();
            fakeEdumaContext.SaveChanges();
        }
    }
}
