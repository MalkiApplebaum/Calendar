using Calendar.Api.Application;
using Calendar.Api.DTO.Commands;
using Calendar.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using System.Xml;

namespace Calendar.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private static List<User> users = DataService.LoadUsers();


        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("Login")]
        public IResult Login(UserCommand user)
        {
            var logedInUser = users.Find(u => u.UserId == user.UserId && u.Password == user.Password);
            if (logedInUser == null)
            {
                return Results.Unauthorized();
            }
            return Results.Ok(logedInUser);
        }


        [HttpPost]
        [Route("Register")]
        public IResult Register(User newUser)
        {
            if (users.Exists(user => user.UserId == newUser.UserId))
                return Results.Conflict(new Exception("User already exists"));
            users.Add(newUser);
            DataService.SaveUsers(users);
            return Results.Ok();
        }
    }
}