using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace WAX.Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScriptController : ControllerBase
    {
        private readonly string _scriptsPath;

        public ScriptController(IWebHostEnvironment env)
        {
            _scriptsPath = Path.Combine(env.ContentRootPath, "..", "..", "scripts");
        }

        /// <summary>
        /// Execute a PowerShell script
        /// </summary>
        [HttpPost("powershell/{scriptName}")]
        public async Task<IActionResult> ExecutePowerShellScript(string scriptName, [FromBody] ScriptParameters parameters)
        {
            try
            {
                var scriptPath = Path.Combine(_scriptsPath, "powershell", $"{scriptName}.ps1");
                
                if (!System.IO.File.Exists(scriptPath))
                {
                    return NotFound(new { error = $"Script not found: {scriptName}" });
                }

                var args = BuildPowerShellArguments(scriptPath, parameters);
                
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "powershell.exe",
                        Arguments = args,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        CreateNoWindow = true,
                        Verb = "runas" // Request elevation
                    }
                };

                process.Start();
                
                var output = await process.StandardOutput.ReadToEndAsync();
                var errors = await process.StandardError.ReadToEndAsync();
                
                await process.WaitForExitAsync();

                return Ok(new
                {
                    success = process.ExitCode == 0,
                    exitCode = process.ExitCode,
                    output = output,
                    errors = errors
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Execute a Batch script
        /// </summary>
        [HttpPost("batch/{scriptName}")]
        public async Task<IActionResult> ExecuteBatchScript(string scriptName, [FromBody] ScriptParameters parameters)
        {
            try
            {
                var scriptPath = Path.Combine(_scriptsPath, "batch", $"{scriptName}.bat");
                
                if (!System.IO.File.Exists(scriptPath))
                {
                    return NotFound(new { error = $"Script not found: {scriptName}" });
                }

                var args = BuildBatchArguments(parameters);
                
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = scriptPath,
                        Arguments = args,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        CreateNoWindow = true,
                        Verb = "runas" // Request elevation
                    }
                };

                process.Start();
                
                var output = await process.StandardOutput.ReadToEndAsync();
                var errors = await process.StandardError.ReadToEndAsync();
                
                await process.WaitForExitAsync();

                return Ok(new
                {
                    success = process.ExitCode == 0,
                    exitCode = process.ExitCode,
                    output = output,
                    errors = errors
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private string BuildPowerShellArguments(string scriptPath, ScriptParameters parameters)
        {
            var args = $"-ExecutionPolicy Bypass -File \"{scriptPath}\"";
            
            if (parameters.Parameters != null)
            {
                foreach (var param in parameters.Parameters)
                {
                    args += $" -{param.Key} {param.Value}";
                }
            }

            return args;
        }

        private string BuildBatchArguments(ScriptParameters parameters)
        {
            var args = "";
            
            if (parameters.Parameters != null)
            {
                foreach (var param in parameters.Parameters.Values)
                {
                    args += $" {param}";
                }
            }

            return args.TrimStart();
        }
    }

    public class ScriptParameters
    {
        public Dictionary<string, string>? Parameters { get; set; }
    }
}
