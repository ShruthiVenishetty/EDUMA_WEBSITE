using EDUMAWEBAPI.Controllers;
using EDUMAWEBAPI.Models;
using EDUMAWEBAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace EdumaTest.ControllerTesting
{

    public class EventsControllerTest
    {
        private Mock<IEventRepository> eventRepo;
        EventsController eventsController;
        [SetUp]
        public void Setup()
        {
            eventRepo = new Mock<IEventRepository>();
            eventsController = new EventsController(eventRepo.Object);
        }
        private static List<Event> GetEvents()
        {
            DateTime date = new DateTime(2021, 09, 12);
            List<Event> fakeEvents = new List<Event> {
                new Event { EventId= 100,EventName= "Test1 EventName",StartDate= date,EndDate=date.AddDays(60),Location= "Test1 Location",About= "Test1 About",ImageUrl= "Test1 Image"},
                new Event { EventId= 101,EventName= "Test2 EventName",StartDate= date,EndDate=date.AddDays(60),Location= "Test2 Location",About= "Test2 About",ImageUrl= "Test2 Image"},
                new Event { EventId= 102,EventName= "Test3 EventName",StartDate= date,EndDate=date.AddDays(60),Location= "Test3 Location",About= "Test3 About",ImageUrl= "Test3 Image"},
                new Event { EventId= 103,EventName= "Test4 EventName",StartDate= date,EndDate=date.AddDays(60),Location= "Test4 Location",About= "Test4 About",ImageUrl= "Test4 Image"}

            };
            return fakeEvents;
        }
        [Test]
        public async Task Get_Returns_AllEvents()
        {

            List<Event> events = GetEvents();
            eventRepo.Setup(x => x.GetAllEvents()).ReturnsAsync(events);
            ActionResult<List<Event>> eventsList = await eventsController.Get();
            OkObjectResult controllerResult = eventsList.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.IsNotNull(eventsList, "events List is null");
            Assert.That((controllerResult.Value as List<Event>).Count, Is.EqualTo(4));
            Assert.Pass();
        }
        [Test]
        public async Task Get_Returns_NoEvent()
        {

            List<Event> emptyEvents = new List<Event>();
            eventRepo.Setup(x => x.GetAllEvents()).ReturnsAsync(emptyEvents);
            ActionResult<List<Event>> events = await eventsController.Get();
            NoContentResult controllerResult = events.Result as NoContentResult;
            Assert.AreEqual(204, controllerResult.StatusCode);
            Assert.Pass();
        }

        [Test]
        public async Task GetEvent_Throws_Exception()
        {

            eventRepo.Setup(x => x.GetAllEvents()).Throws(new EdumaException("Error while retrieving all Events"));
            ActionResult<List<Event>> status = await eventsController.Get();
            StatusCodeResult controllerResult = status.Result as StatusCodeResult;
            Assert.AreEqual(500, controllerResult.StatusCode);
            Assert.Pass();
        }
        [Test]
        public async Task Post_Returns_Success()
        {
            DateTime date = new DateTime(2021, 09, 12);
            Event eventDetails = new Event { EventId = 100, EventName = "Test5 EventName", StartDate = date, EndDate = date.AddDays(60), Location = "Test5 Location", About = "Test5 About", ImageUrl = "Test5 Image" };
            eventRepo.Setup(x => x.InsertEvent(eventDetails)).Verifiable();
            ActionResult<string> status = await eventsController.Post(eventDetails);
            OkObjectResult controllerResult = status.Result as OkObjectResult;
            Assert.AreEqual(200, controllerResult.StatusCode);
            Assert.AreEqual("Successfully Inserted Event Details", controllerResult.Value);
            Assert.Pass();
        }
        [Test]
        public async Task Post_Returns_BadRequest_WhenDetailsGiven_ButNotInserted()
        {
            DateTime date = new DateTime(2021, 09, 12);
            Event eventDetails = new Event { EventId = 100, EventName = "Test5 EventName", StartDate = date, EndDate = date.AddDays(60), Location = "Test5 Location", About = "Test5 About", ImageUrl = "Test5 Image" };
            eventRepo.Setup(x => x.InsertEvent(eventDetails)).Throws(new EdumaException("Error while adding Employee"));
            ActionResult<string> status = await eventsController.Post(eventDetails);
            BadRequestObjectResult controllerResult = status.Result as BadRequestObjectResult;
            Assert.AreEqual(400, controllerResult.StatusCode);
            Assert.AreEqual("Error while adding Employee", controllerResult.Value);
            Assert.Pass();
        }
    }
}
