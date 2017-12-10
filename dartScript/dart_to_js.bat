@echo off
set "js=.js"
for %%i in (*.dart) do dart2js %%i --out=%%i%js%