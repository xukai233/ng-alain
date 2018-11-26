&"..\node_modules\.bin\nswag" run

Write-Host 'generate code of service proxies success.'

Get-ChildItem -Include '*.ts' -Recurse | ForEach-Object {
    (Get-Content -Encoding UTF8 $_) | ForEach-Object {
        $_ -replace '\/do-create-','/' `
           -replace '\/do-update-','/' `
           -replace '\/do-delete-','/' `
           -replace '\/do-get-','/' `
           -replace '\/do-create"','"' `
           -replace 'doCreate','create' `
           -replace '\/do-update"','"' `
           -replace 'doUpdate','update' `
           -replace '\/do-delete"','"' `
           -replace 'doDelete','delete' `
           -replace '\/do-get"','"' `
           -replace 'doGet','get'
    } | Set-Content $_
}
Write-Host 'tags in code already replaced.'

Copy-Item 'service-proxies.ts'  -Destination '../src/app/service-proxies/service-proxies.ts'

Write-Host 'all done.'
