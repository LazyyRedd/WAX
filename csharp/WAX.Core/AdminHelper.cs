using System;
using System.Security.Principal;

namespace WAX.Core
{
    /// <summary>
    /// Helper class for checking and managing administrator privileges
    /// </summary>
    public static class AdminHelper
    {
        /// <summary>
        /// Checks if the current process is running with Administrator privileges
        /// </summary>
        /// <returns>True if running as Administrator, false otherwise</returns>
        public static bool IsAdministrator()
        {
            try
            {
                using var identity = WindowsIdentity.GetCurrent();
                var principal = new WindowsPrincipal(identity);
                return principal.IsInRole(WindowsBuiltInRole.Administrator);
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Gets a message indicating that Administrator privileges are required
        /// </summary>
        public static string AdminRequiredMessage => 
            "This operation requires Administrator privileges. Please run the application as Administrator.";

        /// <summary>
        /// Throws an exception if not running as Administrator
        /// </summary>
        public static void RequireAdministrator()
        {
            if (!IsAdministrator())
            {
                throw new UnauthorizedAccessException(AdminRequiredMessage);
            }
        }
    }
}
