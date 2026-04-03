# Brelinx Website Local Server Script
# This script will start a local server to run the website with live reloading.

# Ensure we are in the script's directory
Set-Location -Path $PSScriptRoot

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   Brelinx Local Web Server" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Launching website at http://localhost:5500..." -ForegroundColor White

# Check if npm is installed
if (Get-Command "npm" -ErrorAction SilentlyContinue) {
    # Use npx to run live-server (which includes live-reloading)
    npx -y live-server . --port=5500
} else {
    Write-Host "Error: Node.js and npm are not installed." -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/ to use this script." -ForegroundColor White
    Read-Host "Press Enter to exit..."
}
