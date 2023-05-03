echo "Running swift bill application"

start  /B /wait cmd /c "npx kill-port 3000"
start  /B /wait cmd /c "npx kill-port 8000"

start /B /D "swift-bill-app" cmd /c "npm start"
start /B /D "swift-bill-server" cmd /c "npm start"