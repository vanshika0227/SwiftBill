echo "Running swift bill application"

cd "swift-bill-app"
start  /B /wait cmd /c "npm install --frozen-lock"
cd "..\swift-bill-server"
start /B /wait cmd /c "npm install --frozen-lock"
cd ".."
start /B /D "swift-bill-app" cmd /c "npm start"
start /B /D "swift-bill-server" cmd /c "npm start"