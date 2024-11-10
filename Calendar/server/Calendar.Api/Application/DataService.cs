using Calendar.Api.Models;
using Newtonsoft.Json;

namespace Calendar.Api.Application
{
    public static class DataService
    {
        public static List<User> LoadUsers()
        {
            string usersAsJson = File.ReadAllText(@"./Data/users.json");
            return JsonConvert.DeserializeObject<List<User>>(usersAsJson) ?? new List<User>();            
        }

        public static void SaveUsers(List<User> users)
        {
            string usersAsJson = JsonConvert.SerializeObject(users, Formatting.Indented);
            File.WriteAllText(@"./Data/users.json", usersAsJson);
        }

        public static List<Event> LoadEvents()
        {
            string events = File.ReadAllText(@"./Data/events.json");
            return JsonConvert.DeserializeObject<List<Event>>(events) ?? new List<Event>();
        }

        public static void SaveEvents(List<Event> events)
        {
            string eventsAsJson = JsonConvert.SerializeObject(events, Formatting.Indented);
            File.WriteAllText(@"./Data/events.json", eventsAsJson);
        }
    }
}
