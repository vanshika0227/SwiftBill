echo "Running swift bill application"

(
cd "swift-bill-app"
START "" /WAIT "npm install --frozen-lock"
cd "..\swift-bill-server"
START ""/WAIT "npm install --frozen-lock"
cd .".."
start "" /D "swift-bill-app" "npm start"
start "" /D "swift-bill-server" "npm start"
) | pause
Echo waited