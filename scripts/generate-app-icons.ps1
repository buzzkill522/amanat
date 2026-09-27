# Render the existing eye mark on a square background for installed app icons.
Add-Type -AssemblyName System.Drawing
foreach ($size in @(192, 512)) {
  $bitmap = New-Object System.Drawing.Bitmap($size, $size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#f7f7f5'))
  $graphics.ScaleTransform($size / 64.0, $size / 64.0)
  $outline = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#161616'), 2.5)
  $eye = New-Object System.Drawing.Drawing2D.GraphicsPath
  $eye.AddBezier(8,32,24,15,40,15,56,32)
  $eye.AddBezier(56,32,40,49,24,49,8,32)
  $eye.CloseFigure()
  $graphics.FillPath([System.Drawing.Brushes]::White, $eye)
  $graphics.DrawPath($outline, $eye)
  $gold = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#ffd23f'))
  $graphics.FillEllipse($gold, 22,22,20,20)
  $graphics.DrawEllipse($outline,22,22,20,20)
  $graphics.FillEllipse([System.Drawing.Brushes]::Black,28,28,8,8)
  $bitmap.Save((Join-Path $PSScriptRoot "../public/icon-$size.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $gold.Dispose()
  $outline.Dispose()
  $eye.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}
