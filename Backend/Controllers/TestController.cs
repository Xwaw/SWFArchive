using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("calculation")]
        public IActionResult Get([FromQuery] string operationMath,[FromQuery] int number1,[FromQuery] int number2)
        {
            return operationMath switch
            {
                "add" => Ok(number1 + number2),
                "sub" => Ok(number1 - number2),
                "mul" => Ok(number1 * number2),
                "div" => Ok(number1 / number2),
                _ => Ok("There is nothing to do.")
            };
        }
    }
}