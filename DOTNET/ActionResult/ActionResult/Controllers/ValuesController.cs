using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ActionResult.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet("example-typed")]
        public ActionResult<string> GetExampleTyped()
        {
            // Simulate some logic
            string message = "Hello from ActionResult<string>!";

            if (string.IsNullOrEmpty(message))
            {
                return NotFound("Message not found");
            }

            return Ok(message); // Returns 200 OK with the string
        }



        [HttpGet("example")]
        public IActionResult GetExample()
        {
            // Simulate some logic
            var data = new { Message = "Hello from IActionResult!" };

            if (data == null) // Example error handling
            {
                return NotFound("Data not found");
            }

            return Ok(data); // Returns 200 OK with JSON data
        }
    }
}
