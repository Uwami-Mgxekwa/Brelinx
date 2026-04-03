@echo off
rem Brelinx Website Local Server Wrapper
rem This file is double-clickable to run the PowerShell script.

rem Ensure we are in the script's directory
cd /d "%~dp0"

echo ================================
echo    Brelinx Local Web Server
echo ================================

powershell -ExecutionPolicy Bypass -File "run_site.ps1"

pause
