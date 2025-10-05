using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using ApiVersion = Asp.Versioning.ApiVersion; // avoid ambiguity

namespace APIVersioning.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/products")]
    public class ProductsController : ControllerBase
    {
        // Version 1
        [HttpGet]
        [MapToApiVersion("1.0")]
        public IActionResult GetV1() => Ok("Products from API Version 1");

        // Version 2
        [HttpGet]
        [MapToApiVersion("2.0")]
        public IActionResult GetV2() => Ok("Products from API Version 2 with new features");
    }
}
