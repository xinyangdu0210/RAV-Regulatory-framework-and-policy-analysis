$ErrorActionPreference = "Stop"

$sitePath = Split-Path -Parent $MyInvocation.MyCommand.Path
$previewUrl = "http://127.0.0.1:8000/"
$pythonPath = (Get-Command python -ErrorAction Stop).Source

Write-Host ""
Write-Host "Starting RAV Policy Navigator preview..." -ForegroundColor Cyan
Write-Host "Edit data.js, save it, and refresh the browser to see changes." -ForegroundColor Yellow
Write-Host "Preview: $previewUrl"
Write-Host ""

$server = Start-Process `
  -FilePath $pythonPath `
  -WorkingDirectory $sitePath `
  -ArgumentList @("-m", "http.server", "8000") `
  -WindowStyle Hidden `
  -PassThru

try {
  Start-Sleep -Milliseconds 700
  Start-Process $previewUrl
  Read-Host "Press Enter when you want to stop the preview server"
}
finally {
  if ($server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id
  }
}
