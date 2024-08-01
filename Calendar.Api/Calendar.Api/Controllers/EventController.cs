using Calendar.Api.Application;
using Calendar.Api.DTO.Querries;
using Calendar.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace Calendar.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {

        private static List<Event> events = DataService.LoadEvents();


        private readonly ILogger<EventController> _logger;

        public EventController(ILogger<EventController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{userId}")]
        public IResult GetEventsByUser(string userId)
        {
            var userEvents = events.FindAll(e => e.UserId == userId);
            return Results.Ok(userEvents);
        }

        [HttpPost]
        public IResult SaveEvent(Event _event)
        {
            if (!events.Exists(e => e.EventId == _event.EventId && e.UserId == _event.UserId))
                events.Add(_event);
            else
                events = events.Select(e => (e.EventId == _event.EventId && e.UserId == _event.UserId) ? _event : e).ToList();

            DataService.SaveEvents(events);
            return Results.Ok();
        }

        //[HttpPost]
        //public IResult SearchEvents(SearchQuery searchQuery)
        //{
        //    var userEvents = events.FindAll((e) => e.UserId == searchQuery.UserId);
        //    var searchResult = userEvents.Where((e) => !string.IsNullOrEmpty(searchQuery.Title) && e.Title.Contains(searchQuery.Title));
        //    return Results.Ok();
        //}


        [HttpDelete("{eventId}")]
        public IResult DeleteEvent(int eventId)
        {
            var eventToRemove = events.FirstOrDefault(e => e.EventId == eventId);
            if (eventToRemove != null) events.Remove(eventToRemove);
            DataService.SaveEvents(events);
            return Results.Ok();
        }
    }
}