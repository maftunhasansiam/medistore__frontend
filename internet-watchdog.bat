@echo off
title Internet Watchdog

:loop
ping 8.8.8.8 -n 1 >nul

if errorlevel 1 (
    echo [%time%] Internet LOST

    timeout /t 60 /nobreak >nul

    ping 8.8.8.8 -n 1 >nul

    if errorlevel 1 (
        echo [%time%] Still offline. Shutdown scheduled.
        shutdown /s /f /t 120
        goto monitor_shutdown
    )
)

echo [%time%] Internet OK
timeout /t 20 /nobreak >nul
goto loop

:monitor_shutdown
ping 8.8.8.8 -n 1 >nul

if not errorlevel 1 (
    echo Internet restored! Cancelling shutdown.
    shutdown /a
    goto loop
)

timeout /t 20 /nobreak >nul
goto monitor_shutdown