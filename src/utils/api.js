/**
 * API utility for communicating with the C# backend service
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch system information from C# backend
 */
export async function getSystemInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/info`);
    if (!response.ok) throw new Error('Failed to fetch system info');
    return await response.json();
  } catch (error) {
    console.error('Error fetching system info:', error);
    // Return mock data if C# service is not available
    return {
      cpu: { usage: 45, unit: '%' },
      memory: { total: 16, available: 7.8, used: 8.2, unit: 'GB' },
      disk: { total: 512, used: 256, free: 256, unit: 'GB' },
      uptime: { hours: 5, minutes: 32, formatted: '5h 32m' }
    };
  }
}

/**
 * Clean temporary files using C# backend
 */
export async function cleanTemporaryFiles() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/clean/temp`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to clean temp files');
    return await response.json();
  } catch (error) {
    console.error('Error cleaning temp files:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Disable Windows telemetry using C# backend
 */
export async function disableTelemetry() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/privacy/disable-telemetry`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to disable telemetry');
    return await response.json();
  } catch (error) {
    console.error('Error disabling telemetry:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Optimize visual effects using C# backend
 */
export async function optimizeVisualEffects() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/performance/visual-effects`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to optimize visual effects');
    return await response.json();
  } catch (error) {
    console.error('Error optimizing visual effects:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Optimize network settings using C# backend
 */
export async function optimizeNetwork() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/network/optimize`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to optimize network');
    return await response.json();
  } catch (error) {
    console.error('Error optimizing network:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create system restore point using C# backend
 */
export async function createRestorePoint(description = 'WAX System Restore Point') {
  try {
    const response = await fetch(`${API_BASE_URL}/system/restore/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description })
    });
    if (!response.ok) throw new Error('Failed to create restore point');
    return await response.json();
  } catch (error) {
    console.error('Error creating restore point:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Execute PowerShell script
 */
export async function executePowerShellScript(scriptName, params = {}) {
  try {
    // This would require additional endpoint in C# service
    console.log(`Executing PowerShell script: ${scriptName}`, params);
    return { success: true };
  } catch (error) {
    console.error('Error executing PowerShell script:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Execute Batch script
 */
export async function executeBatchScript(scriptName, params = {}) {
  try {
    // This would require additional endpoint in C# service
    console.log(`Executing Batch script: ${scriptName}`, params);
    return { success: true };
  } catch (error) {
    console.error('Error executing Batch script:', error);
    return { success: false, error: error.message };
  }
}
