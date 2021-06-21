using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenCvSharp;

namespace core.Controllers
{
    [ApiController]
    [Route("/")]
    public class ImageController : ControllerBase
    {
        private readonly ILogger<ImageController> _logger;

        public ImageController(ILogger<ImageController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            Mat mat = new Mat(256, 256, MatType.CV_8UC3, Scalar.Azure);
            return File(mat.ToMemoryStream(".png"), "image/png");
        }
    }
}
