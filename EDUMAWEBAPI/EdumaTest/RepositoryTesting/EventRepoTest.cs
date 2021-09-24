using EDUMAWEBAPI.Models;
using EDUMAWEBAPI.Repositories;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EdumaTest.RepositoryTesting
{
    public class EventRepoTest
    {
        DbContextOptions<EdumaDbContext> options = new DbContextOptionsBuilder<EdumaDbContext>().UseInMemoryDatabase(databaseName: "MockEDUMADatabase").Options;
        private EdumaDbContext fakeEdumaContext;
        private EventRepository eventRepository;

        [SetUp]
        public void Setup()
        {
            fakeEdumaContext = new EdumaDbContext(options);
            fakeEdumaContext.Events.AddRange(GetEvents());
            fakeEdumaContext.SaveChanges();
            eventRepository = new EventRepository(fakeEdumaContext);
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
        public async Task GetAllEvents_Pass_Test()
        {
            List<Event> eventsList = await eventRepository.GetAllEvents();
            Assert.AreEqual(4, eventsList.Count);
        }
        [Test]
        public async Task InsertEvent_Pass_Test()
        {
            DateTime date = new DateTime(2021, 09, 12);
            Event eventDetails = new Event { EventId = 104, EventName = "Test5 EventName", StartDate = date, EndDate = date.AddDays(60), Location = "Test5 Location", About = "Test5 About", ImageUrl = "Test5 Image" };
            var beforeCount = fakeEdumaContext.Events.ToList().Count;
            await eventRepository.InsertEvent(eventDetails);
            var afterCount = fakeEdumaContext.Events.ToList().Count;
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
