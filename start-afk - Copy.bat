@echo off
git add --all .
set /p pathName=Enter Commit Name:
git commit -m "%pathName%"
