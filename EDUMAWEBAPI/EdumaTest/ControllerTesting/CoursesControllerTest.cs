using EDUMAWEBAPI.Controllers;
using EDUMAWEBAPI.Models;
using EDUMAWEBAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace EdumaTest.ControllerTesting
{

    public class CoursesControllerTests
    {
        private Mock<ICourseRepository> courseRepo;
        CoursesController coursesController;
        [SetUp]
        public void Setup()
        {
            courseRepo = new Mock<ICourseRepository>();
            coursesController = new CoursesController(courseRepo.Object);
        }
        private static List<Course> GetCourses()
        {
            List<Course> fakeCourses = new List<Course> {
                new Course {CourseId=100, ImageUrl = "Test1 ImageUrl",ProfilePicUrl="Test1 ProfileUrl",CommentsCount=10,DiscountedPrice=0,ActualPrice=0,Categories="Test1 Category",ReviewCount=5,LecturesCount=4,Quizzes=5,DurationInHours=9,SkillLevel="Test1 skill Level",Language="Test1 language",Assessments=true,Certificate=true,InstructorName="Test1 InstructorName",CourseName="Test1 CourseName",StudentCount=10},
                new Course {CourseId=101, ImageUrl = "Test2 ImageUrl",ProfilePicUrl="Test2 ProfileUrl",CommentsCount=12,DiscountedPrice=5,ActualPrice=7,Categories="Test2 Category",ReviewCount=4,LecturesCount=8,Quizzes=9,DurationInHours=9,SkillLevel="Test2 skill Level",Language="Test2 language",Assessments=true,Certificate=false,InstructorName="Test2 InstructorName",CourseName="Test2 CourseName",StudentCount=12},
                  new Course {CourseId=102, ImageUrl = "Test3 ImageUrl",ProfilePicUrl="Test3 ProfileUrl",CommentsCount=10,DiscountedPrice=0,ActualPrice=0,Categories="Test1 Category",ReviewCount=5,LecturesCount=4,Quizzes=5,DurationInHours=9,SkillLevel="Test3 skill Level",Language="Test3 language",Assessments=true,Certificate=true,InstructorName="Test2 InstructorName",CourseName="Test3 CourseName",StudentCount=10},
                new Course {CourseId=103, ImageUrl = "Test4 ImageUrl",ProfilePicUrl="Test4 ProfileUrl",CommentsCount=12,DiscountedPrice=5,ActualPrice=7,Categories="Test2 Category",ReviewCount=4,LecturesCount=8,Quizzes=9,DurationInHours=9,SkillLevel="Test4 skill Level",Language="Test4 language",Assessments=true,Certificate=false,InstructorName="Test1 InstructorName",CourseName="Test4 CourseName",StudentCount=12}

                };
            return fakeCourses;
        }
        [Test]
        public async Task Get_Returns_AllCourses()
        {

            List<Course> courses = GetCourses();
            courseRepo.Setup(x => x.GetAllCourses()).ReturnsAsync(courses);
            ActionResult<List<Course>> coursesList = await coursesController.Get();
            OkObjectResult controllerResult = coursesList.Result  as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.IsNotNull(coursesList, "Course List is null");
            Assert.That((controllerResult.Value as List<Course>).Count, Is.EqualTo(4));
            Assert.Pass();
        }
        
        [Test]
        public async Task Get_Returns_NoCourses()
        {

            List<Course> emptyCourses = new List<Course>();
            courseRepo.Setup(x => x.GetAllCourses()).ReturnsAsync(emptyCourses);
            ActionResult<List<Course>> courses = await coursesController.Get();
            NoContentResult controllerResult = courses.Result as NoContentResult;
            Assert.AreEqual(204, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetCourse_Throws_Exception()
        {
            
            courseRepo.Setup(x => x.GetAllCourses()).Throws(new EdumaException("Error while retrieving all Course"));  
            ActionResult<List<Course>> status = await coursesController.Get();
            StatusCodeResult controllerResult = status.Result as StatusCodeResult;
            Assert.AreEqual(500, controllerResult.StatusCode);
            Assert.Pass();
        }

        [TestCase(100)]
        [TestCase(101)]
        public async Task GetByCourseId_Returns_Course(int courseid)
        {

            Course course = GetCourses().Find(x => x.CourseId == courseid);
            courseRepo.Setup(x => x.GetCourseById(courseid)).ReturnsAsync(course);
            ActionResult<Course> courseDetails = await coursesController.GetByCourseId(courseid);
            OkObjectResult controllerResult = courseDetails.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.IsNotNull(courseDetails, "No details for Course");
            Assert.AreEqual(courseid, (controllerResult.Value as Course).CourseId, "Got Wrong Course");
            Assert.Pass();
        }


        [TestCase(105)]
        [TestCase(106)]
        public async Task GetByCourseId_Returns_NoCourse(int courseid)
        {

            Course emptyCourse = new Course();
            courseRepo.Setup(x => x.GetCourseById(courseid)).ReturnsAsync(emptyCourse);
            ActionResult<Course> courseDetails = await coursesController.GetByCourseId(courseid);
            NoContentResult controllerResult = courseDetails.Result as NoContentResult;
            Assert.AreEqual(204, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetByCourseId_Throws_Exception()
        {

            courseRepo.Setup(x => x.GetCourseById(110)).Throws(new EdumaException("Error while retrieving Course by Id"));
            ActionResult<Course> status = await coursesController.GetByCourseId(110);
            StatusCodeResult controllerResult = status.Result as StatusCodeResult;
            Assert.AreEqual(500, controllerResult.StatusCode);
            Assert.Pass();
        }

        [TestCase("Test1 Category")]
        [TestCase("Test2 Category")]
        public async Task GetByCategoryName_Returns_Course(string categoryName)
        {

            List<Course> courses = GetCourses().FindAll(x => x.Categories == categoryName);
            courseRepo.Setup(x => x.GetCourseByCategory(categoryName)).ReturnsAsync(courses);
            ActionResult<List<Course>> coursesList = await coursesController.GetByCategoryName(categoryName);
            OkObjectResult controllerResult = coursesList.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.IsNotNull(coursesList, "Course List is null");
            Assert.That((controllerResult.Value as List<Course>).Count, Is.EqualTo(2));
            Assert.Pass();
        }

        [TestCase("Test3 Category")]
        [TestCase("Test4 Category")]
        public async Task GetByCategoryName_Returns_NoCourse(string categoryName)
        {

            List<Course> courses = GetCourses().FindAll(x => x.Categories == categoryName);
            courseRepo.Setup(x => x.GetCourseByCategory(categoryName)).ReturnsAsync(courses);
            ActionResult<List<Course>> coursesList = await coursesController.GetByCategoryName(categoryName);
            NoContentResult controllerResult = coursesList.Result as NoContentResult;
            Assert.AreEqual(204, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetByCategoryName_Throws_Exception()
        {

            courseRepo.Setup(x => x.GetCourseByCategory("TestCategory")).Throws(new EdumaException("Error while retrieving Courses by category"));
            ActionResult<List<Course>> status = await coursesController.GetByCategoryName("TestCategory");
            StatusCodeResult controllerResult = status.Result as StatusCodeResult;
            Assert.AreEqual(500, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetAllCategoryName_Returns_Categoies()
        {

            List<CategoryDetails> categoryNames = new List<CategoryDetails>()
            { new CategoryDetails { CategoryName="Test1 Category", CategoryCount=2 },new CategoryDetails { CategoryName="Test2 Category", CategoryCount=2 } };
            courseRepo.Setup(x => x.GetAllCategoryNames()).ReturnsAsync(categoryNames);
            ActionResult<List<CategoryDetails>> categoryNameList = await coursesController.GetAllCategoryName();
            OkObjectResult controllerResult = categoryNameList.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.IsNotNull(categoryNameList, "categoryName List is null");
            Assert.That((controllerResult.Value as List<CategoryDetails>).Count, Is.EqualTo(2));
            Assert.Pass();
        }

       
        [Test]
        public async Task GetAllCategoryName_Returns_NoCategoies()
        {

            List<CategoryDetails> emptyCategoryNames = new List<CategoryDetails>();
            courseRepo.Setup(x => x.GetAllCategoryNames()).ReturnsAsync(emptyCategoryNames);
            ActionResult<List<CategoryDetails>> catogeriesNames = await coursesController.GetAllCategoryName();
            NoContentResult controllerResult = catogeriesNames.Result as NoContentResult;
            Assert.AreEqual(204, controllerResult.StatusCode);
            Assert.Pass();
        }
        [Test]
        public async Task GetCategoryName_Throws_Exception()
        {

            courseRepo.Setup(x => x.GetAllCategoryNames()).Throws(new EdumaException("Error while retrieving Category Names"));
            ActionResult<List<CategoryDetails>> status = await coursesController.GetAllCategoryName();
            StatusCodeResult controllerResult = status.Result as StatusCodeResult;
            Assert.AreEqual(500, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetAllInstructorName_Returns_Instructors()
        {

            List<InstructorDetails> instructorNames = new List<InstructorDetails>()
            { new InstructorDetails { InstructorName="Test1 InstructorName", InstructorCount=2 },new InstructorDetails { InstructorName="Test2 InstructorName", InstructorCount=2 } };
            courseRepo.Setup(x => x.GetAllInstructorNames()).ReturnsAsync(instructorNames);
            ActionResult<List<InstructorDetails>> instructorNameList = await coursesController.GetAllInstructorName();
            OkObjectResult controllerResult = instructorNameList.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.IsNotNull(instructorNameList, "instructorName List is null");
            Assert.That((controllerResult.Value as List<InstructorDetails>).Count, Is.EqualTo(2));
            Assert.Pass();
        }



        [Test]
        public async Task GetAllInstructorName_Returns_NoInstructors()
        {
            List<InstructorDetails> emptyInstructorNames = new List<InstructorDetails>();
            courseRepo.Setup(x => x.GetAllInstructorNames()).ReturnsAsync(emptyInstructorNames);
            ActionResult<List<InstructorDetails>> instructorNames = await coursesController.GetAllInstructorName();
            NoContentResult controllerResult = instructorNames.Result as NoContentResult;
            Assert.AreEqual(204, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetInstructor_Throws_Exception()
        {

            courseRepo.Setup(x => x.GetAllInstructorNames()).Throws(new EdumaException("Error while retrieving Instructor Names"));
            ActionResult<List<InstructorDetails>> status = await coursesController.GetAllInstructorName();
            StatusCodeResult controllerResult = status.Result as StatusCodeResult;
            Assert.AreEqual(500, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetByFilters_Returns_Courses()
        {

            FilterData filterData = new FilterData() { Categories = new List<string> { "Test1 Category" }, Instructors = new List<string> { "Test1 InstructorName" }, Price = "All" };
            List<Course> courses = new List<Course>();
            courses.Add(GetCourses().ToArray()[0]);
            courseRepo.Setup(x => x.GetByFilter(filterData)).ReturnsAsync(courses);
            ActionResult<List<Course>> coursesList = await coursesController.GetByFilters(filterData);
            OkObjectResult controllerResult = coursesList.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.IsNotNull(coursesList, "courses List is null");
            Assert.That((controllerResult.Value as List<Course>).Count, Is.EqualTo(1));
            Assert.Pass();
        }

        [Test]
        public async Task GetByFilters_Returns_NoCourses()
        {
            FilterData filterData = new FilterData();
            List<Course> courses = new List<Course>();
            courseRepo.Setup(x => x.GetByFilter(filterData)).ReturnsAsync(courses);
            ActionResult<List<Course>> coursesList = await coursesController.GetByFilters(filterData);
            NoContentResult controllerResult = coursesList.Result as NoContentResult;
            Assert.AreEqual(204, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetFilters_Throws_Exception()
        {
            FilterData filterData = new FilterData() { Categories = new List<string> { "TestCategory" }, Instructors = new List<string> { "TestInstructorName" }, Price = "None" };

            courseRepo.Setup(x => x.GetByFilter(filterData)).Throws(new EdumaException("Error while performing Filters"));
            ActionResult<List<Course>> status = await coursesController.GetByFilters(filterData);
            StatusCodeResult controllerResult = status.Result as StatusCodeResult;
            Assert.AreEqual(500, controllerResult.StatusCode);
            Assert.Pass();
        }


        [Test]
        public async Task Post_Returns_Success()
        {
            Course courseDetails = new Course { CourseId = 100, ImageUrl = "Test1 ImageUrl", ProfilePicUrl = "Test1 ProfileUrl", CommentsCount = 10, DiscountedPrice = 0, ActualPrice = 0, Categories = "Test1 Category", ReviewCount = 5, LecturesCount = 4, Quizzes = 5, DurationInHours = 9, SkillLevel = "Test1 skill Level", Language = "Test1 language", Assessments = true, Certificate = true, InstructorName = "Test1 InstructorName", CourseName = "Test1 CourseName", StudentCount = 10 };
            courseRepo.Setup(x => x.InsertCourse(courseDetails)).Verifiable();
            ActionResult<string> status = await coursesController.Post(courseDetails);
            OkObjectResult controllerResult = status.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.AreEqual("Successfully Inserted Course Details", controllerResult.Value);
            Assert.Pass();
        }
        [Test]
        public async Task Post_Returns_BadRequest_WhenDetailsGiven_ButNotInserted()
        {
            Course courseDetails = new Course { CourseId = 100, ImageUrl = "Test1 ImageUrl", ProfilePicUrl = "Test1 ProfileUrl", CommentsCount = 10, DiscountedPrice = 0, ActualPrice = 0, Categories = "Test1 Category", ReviewCount = 5, LecturesCount = 4, Quizzes = 5, DurationInHours = 9, SkillLevel = "Test1 skill Level", Language = "Test1 language", Assessments = true, Certificate = true, InstructorName = "Test1 InstructorName", CourseName = "Test1 CourseName", StudentCount = 10 };
            courseRepo.Setup(x => x.InsertCourse(courseDetails)).Throws(new EdumaException("Error while adding Course"));
            ActionResult<string> status = await coursesController.Post(courseDetails);
            BadRequestObjectResult controllerResult = status.Result as BadRequestObjectResult;
            Assert.AreEqual(400, controllerResult.StatusCode);
            Assert.AreEqual("Error while adding Course", controllerResult.Value);
            Assert.Pass();
        }
       


    }
}