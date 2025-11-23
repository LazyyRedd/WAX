using Microsoft.AspNetCore.Mvc;
using WAX.Core;

namespace WAX.Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SystemController : ControllerBase
    {
        /// <summary>
        /// Get system information
        /// </summary>
        [HttpGet("info")]
        public IActionResult GetSystemInfo()
        {
            try
            {
                var cpuUsage = SystemInfo.GetCpuUsage();
                var totalMemory = SystemInfo.GetTotalMemoryGB();
                var availableMemory = SystemInfo.GetAvailableMemoryGB();
                var uptime = SystemInfo.GetSystemUptime();
                var diskInfo = SystemInfo.GetDiskUsage("C");

                return Ok(new
                {
                    cpu = new
                    {
                        usage = Math.Round(cpuUsage, 2),
                        unit = "%"
                    },
                    memory = new
                    {
                        total = totalMemory,
                        available = availableMemory,
                        used = Math.Round(totalMemory - availableMemory, 2),
                        unit = "GB"
                    },
                    disk = new
                    {
                        total = diskInfo.TotalGB,
                        used = diskInfo.UsedGB,
                        free = diskInfo.FreeGB,
                        unit = "GB"
                    },
                    uptime = new
                    {
                        hours = uptime.Hours,
                        minutes = uptime.Minutes,
                        formatted = $"{uptime.Hours}h {uptime.Minutes}m"
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Clean temporary files
        /// </summary>
        [HttpPost("clean/temp")]
        public IActionResult CleanTemporaryFiles()
        {
            try
            {
                var bytesFreed = SystemOptimizer.CleanTemporaryFiles();
                var mbFreed = Math.Round(bytesFreed / (1024.0 * 1024.0), 2);
                return Ok(new { success = true, freedMB = mbFreed });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Disable telemetry
        /// </summary>
        [HttpPost("privacy/disable-telemetry")]
        public IActionResult DisableTelemetry()
        {
            try
            {
                var success = SystemOptimizer.DisableTelemetry();
                return Ok(new { success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Optimize visual effects
        /// </summary>
        [HttpPost("performance/visual-effects")]
        public IActionResult OptimizeVisualEffects()
        {
            try
            {
                var success = SystemOptimizer.OptimizeVisualEffects();
                return Ok(new { success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Optimize network settings
        /// </summary>
        [HttpPost("network/optimize")]
        public IActionResult OptimizeNetwork()
        {
            try
            {
                var success = SystemOptimizer.OptimizeNetwork();
                return Ok(new { success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Create system restore point
        /// </summary>
        [HttpPost("restore/create")]
        public IActionResult CreateRestorePoint([FromBody] RestorePointRequest request)
        {
            try
            {
                var success = SystemOptimizer.CreateRestorePoint(request.Description);
                return Ok(new { success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class RestorePointRequest
    {
        public string Description { get; set; } = "WAX System Restore Point";
    }
}
