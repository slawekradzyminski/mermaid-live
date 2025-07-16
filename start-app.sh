#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PORT=3000
URL="http://localhost:${PORT}"
MAX_WAIT=30 # Maximum wait time in seconds

echo -e "${YELLOW}🔄 Killing all Vite processes...${NC}"

# Kill all vite processes
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true

# Wait a moment for processes to terminate
sleep 2

echo -e "${YELLOW}🚀 Starting the app...${NC}"

# Start the app in the background
pnpm dev &
APP_PID=$!

# Function to check if the server is responsive
check_server() {
    curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null
}

# Wait for the server to be responsive
echo -e "${YELLOW}⏳ Waiting for server to be responsive...${NC}"
WAIT_TIME=0
while [ $WAIT_TIME -lt $MAX_WAIT ]; do
    if [ "$(check_server)" = "200" ]; then
        echo -e "${GREEN}✅ Server is responsive!${NC}"
        echo -e "${GREEN}🌐 App is running at: ${URL}${NC}"
        exit 0
    fi
    
    # Check if the process is still running
    if ! kill -0 $APP_PID 2>/dev/null; then
        echo -e "${RED}❌ App process died unexpectedly${NC}"
        exit 1
    fi
    
    sleep 1
    WAIT_TIME=$((WAIT_TIME + 1))
    echo -ne "${YELLOW}⏳ Waiting... ${WAIT_TIME}s${NC}\r"
done

echo -e "\n${RED}❌ Server did not respond within ${MAX_WAIT} seconds${NC}"
echo -e "${RED}🛑 Killing the app process...${NC}"
kill $APP_PID 2>/dev/null || true
exit 1 