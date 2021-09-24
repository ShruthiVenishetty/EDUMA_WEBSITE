using EDUMAWEBAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Repositories
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllEvents();
        Task InsertEvent(Event eventDetails);

    }
}
