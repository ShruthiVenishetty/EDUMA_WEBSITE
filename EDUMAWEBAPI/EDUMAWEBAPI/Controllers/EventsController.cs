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
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository eventRepository;
        public EventsController(IEventRepository iEventRepository)
        {
            eventRepository = iEventRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Event>>> Get()
        {
            try
            {
                List<Event> events = await eventRepository.GetAllEvents();
                if (events.Count != 0)
                {
                    return Ok(events);
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



        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Event eventDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please enter Correct Details");
            }
            try
            {
                await eventRepository.InsertEvent(eventDetails);
                return Ok("Successfully Inserted Event Details");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
