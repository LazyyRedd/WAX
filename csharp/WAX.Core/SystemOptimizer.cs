using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.Win32;

namespace WAX.Core
{
    /// <summary>
    /// Core system optimization functionality
    /// IMPORTANT: Many operations require Administrator privileges.
    /// The application should be run as Administrator for full functionality.
    /// </summary>
    public class SystemOptimizer
    {
        /// <summary>
        /// Cleans temporary files and returns size freed in bytes
        /// </summary>
        public static long CleanTemporaryFiles()
        {
            long bytesFreed = 0;
            string[] tempPaths = {
                Path.GetTempPath(),
                Environment.GetFolderPath(Environment.SpecialFolder.Windows) + "\\Temp"
            };

            foreach (var tempPath in tempPaths)
            {
                try
                {
                    if (Directory.Exists(tempPath))
                    {
                        var files = Directory.GetFiles(tempPath, "*.*", SearchOption.AllDirectories);
                        foreach (var file in files)
                        {
                            try
                            {
                                var fileInfo = new FileInfo(file);
                                bytesFreed += fileInfo.Length;
                                fileInfo.Delete();
                            }
                            catch
                            {
                                // Skip files in use
                            }
                        }
                    }
                }
                catch
                {
                    // Skip if access denied
                }
            }

            return bytesFreed;
        }

        /// <summary>
        /// Disables Windows telemetry
        /// </summary>
        public static bool DisableTelemetry()
        {
            try
            {
                using var key = Registry.LocalMachine.CreateSubKey(@"SOFTWARE\Policies\Microsoft\Windows\DataCollection");
                if (key != null)
                {
                    key.SetValue("AllowTelemetry", 0, RegistryValueKind.DWord);
                    return true;
                }
            }
            catch
            {
            }
            return false;
        }

        /// <summary>
        /// Optimizes visual effects for performance
        /// </summary>
        public static bool OptimizeVisualEffects()
        {
            try
            {
                using var key = Registry.CurrentUser.CreateSubKey(@"Software\Microsoft\Windows\CurrentVersion\Explorer\VisualEffects");
                if (key != null)
                {
                    key.SetValue("VisualFXSetting", 2, RegistryValueKind.DWord); // Set to "Adjust for best performance"
                    return true;
                }
            }
            catch
            {
            }
            return false;
        }

        /// <summary>
        /// Disables unnecessary Windows services
        /// </summary>
        public static bool DisableService(string serviceName)
        {
            try
            {
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "sc.exe",
                        Arguments = $"config \"{serviceName}\" start= disabled",
                        UseShellExecute = false,
                        CreateNoWindow = true,
                        RedirectStandardOutput = true
                    }
                };
                process.Start();
                process.WaitForExit();
                return process.ExitCode == 0;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Optimizes network settings
        /// </summary>
        public static bool OptimizeNetwork()
        {
            try
            {
                // Disable network throttling
                using var key = Registry.LocalMachine.CreateSubKey(@"SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile");
                if (key != null)
                {
                    key.SetValue("NetworkThrottlingIndex", 0xFFFFFFFF, RegistryValueKind.DWord);
                }

                // Enable TCP Fast Open
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "netsh.exe",
                        Arguments = "int tcp set global fastopen=enabled",
                        UseShellExecute = false,
                        CreateNoWindow = true,
                        Verb = "runas"
                    }
                };
                process.Start();
                process.WaitForExit();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Creates a system restore point
        /// </summary>
        public static bool CreateRestorePoint(string description)
        {
            try
            {
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "powershell.exe",
                        Arguments = $"-Command \"Checkpoint-Computer -Description '{description}' -RestorePointType MODIFY_SETTINGS\"",
                        UseShellExecute = false,
                        CreateNoWindow = true,
                        Verb = "runas"
                    }
                };
                process.Start();
                process.WaitForExit();
                return process.ExitCode == 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
