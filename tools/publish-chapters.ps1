param(
  [ValidateRange(1,100)]
  [int]$Published = 60
)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$projectRoot = Split-Path -Parent $siteRoot
$sourcePath = Join-Path $projectRoot 'manuscrito.md'
$publicManuscript = Join-Path $siteRoot 'manuscrito.md'
$chapterData = Join-Path $siteRoot 'chapters-data.js'

$source = Get-Content -LiteralPath $sourcePath -Raw -Encoding utf8
$matches = [regex]::Matches($source, '(?ms)^# Cap.tulo (?<number>\d+)\r?\n.*?(?=^# Cap.tulo \d+\r?\n|\z)')
if ($matches.Count -lt $Published) {
  throw "El manuscrito solo contiene $($matches.Count) capitulos; no se pueden publicar $Published."
}

$preface = $source.Substring(0, $matches[0].Index).TrimEnd()
$selected = @($matches | Where-Object { [int]$_.Groups['number'].Value -le $Published })
$publishedText = $preface + "`r`n`r`n" + (($selected | ForEach-Object { $_.Value.TrimEnd() }) -join "`r`n`r`n") + "`r`n"
Set-Content -LiteralPath $publicManuscript -Value $publishedText -Encoding utf8

$chapters = foreach ($match in $selected) {
  $block = $match.Value -replace "`r", ''
  $titleMatch = [regex]::Match($block, '(?m)^## (.+)$')
  $title = if ($titleMatch.Success) { $titleMatch.Groups[1].Value.Trim() } else { "Capitulo $($match.Groups['number'].Value)" }
  $bodyStart = $titleMatch.Index + $titleMatch.Length
  $body = $block.Substring($bodyStart).Trim() -replace '(?m)^---\s*$', ''
  $paragraphs = @($body -split "\n\s*\n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -and $_ -ne '---' })
  $words = @($body -split '\s+' | Where-Object { $_ }).Count
  [ordered]@{ title = $title; minutes = [Math]::Max(2,[Math]::Ceiling($words / 190)); paragraphs = $paragraphs }
}

$json = $chapters | ConvertTo-Json -Depth 6 -Compress
Set-Content -LiteralPath $chapterData -Value "window.CHAPTERS=$json;" -Encoding utf8
Write-Host "Publicacion preparada: capitulos 1 al $Published."
