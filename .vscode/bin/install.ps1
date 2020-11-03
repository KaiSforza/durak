[CmdletBinding()]
param (
    [Parameter(Mandatory=$true)]
    [string]
    $root
)

if ( -not (Test-path $root/node_modules/ -PathType Any) ) {
    npm install
} else {
    "Nothing to install, skipping."
}