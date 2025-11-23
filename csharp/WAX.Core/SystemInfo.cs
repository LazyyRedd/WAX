using System;
using System.Management;
using System.Diagnostics;

namespace WAX.Core
{
    /// <summary>
    /// Provides system information and metrics
    /// </summary>
    public class SystemInfo
    {
        /// <summary>
        /// Gets current CPU usage percentage
        /// </summary>
        public static float GetCpuUsage()
        {
            try
            {
                using var cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
                cpuCounter.NextValue();
                System.Threading.Thread.Sleep(100);
                return cpuCounter.NextValue();
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>
        /// Gets available memory in GB
        /// </summary>
        public static double GetAvailableMemoryGB()
        {
            try
            {
                using var ramCounter = new PerformanceCounter("Memory", "Available MBytes");
                var availableMB = ramCounter.NextValue();
                return Math.Round(availableMB / 1024.0, 2);
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>
        /// Gets total physical memory in GB
        /// </summary>
        public static double GetTotalMemoryGB()
        {
            try
            {
                var query = new ObjectQuery("SELECT TotalPhysicalMemory FROM Win32_ComputerSystem");
                using var searcher = new ManagementObjectSearcher(query);
                foreach (ManagementObject mo in searcher.Get())
                {
                    var totalBytes = Convert.ToDouble(mo["TotalPhysicalMemory"]);
                    return Math.Round(totalBytes / (1024.0 * 1024.0 * 1024.0), 2);
                }
            }
            catch
            {
            }
            return 0;
        }

        /// <summary>
        /// Gets system uptime
        /// </summary>
        public static TimeSpan GetSystemUptime()
        {
            try
            {
                using var uptime = new PerformanceCounter("System", "System Up Time");
                uptime.NextValue();
                return TimeSpan.FromSeconds(uptime.NextValue());
            }
            catch
            {
                return TimeSpan.Zero;
            }
        }

        /// <summary>
        /// Gets disk usage information
        /// </summary>
        public static (long TotalGB, long UsedGB, long FreeGB) GetDiskUsage(string driveLetter = "C")
        {
            try
            {
                var drive = new System.IO.DriveInfo(driveLetter);
                if (drive.IsReady)
                {
                    long totalGB = drive.TotalSize / (1024 * 1024 * 1024);
                    long freeGB = drive.AvailableFreeSpace / (1024 * 1024 * 1024);
                    long usedGB = totalGB - freeGB;
                    return (totalGB, usedGB, freeGB);
                }
            }
            catch
            {
            }
            return (0, 0, 0);
        }
    }
}
