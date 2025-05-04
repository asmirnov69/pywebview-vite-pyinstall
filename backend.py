import asyncio
import threading
import webview
import websockets
import os
import sys

async def echo(websocket):
    async for message in websocket:
        print("Received:", message)
        await websocket.send(f"Echo: {message}")

async def start_websocket():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()

def launch_websocket_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(start_websocket())

if __name__ == '__main__':
    threading.Thread(target=launch_websocket_server, daemon=True).start()

    if getattr(sys, 'frozen', False):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(".")

    index_path = os.path.join(base_path, "ui", "dist", "index.html")
    webview.create_window("React + WebSocket", index_path)
    webview.start(debug=True)
