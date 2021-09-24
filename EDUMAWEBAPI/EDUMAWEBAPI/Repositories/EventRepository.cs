using EDUMAWEBAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly EdumaDbContext db;
        public EventRepository(EdumaDbContext edumadbcontext)
        {
            db = edumadbcontext;
        }
        public async Task<List<Event>> GetAllEvents()
        {
            try
            {
                return await db.Events.ToListAsync();
            }
            catch (Exception)
            {
                throw new EdumaException("Error while retrieving all Events");
            }
        }

        public async Task InsertEvent(Event eventDetails)
        {
            try
            {
                await db.Events.AddAsync(eventDetails);
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new EdumaException("Error while adding Employee");
            }
        }
    }
}
