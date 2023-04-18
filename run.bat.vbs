Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c start /b runSwiftBill.bat > output.log", 0, False
Set WshShell = Nothing
