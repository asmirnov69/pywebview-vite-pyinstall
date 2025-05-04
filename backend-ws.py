from typing import Any
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
        
window = None
async def push_counter():
    global window
    i = 0
    while True:
        # NB: this call block python, see alternative https://pywebview.flowrl.com/examples/evaluate_js_async.html
        window.evaluate_js(f"window.updateCounter({i})")
        await asyncio.sleep(1)
        i += 1

class API:
    def say_hello(self) -> str:
        return "Hello from Python!"

def main():
    threading.Thread(target=launch_websocket_server, daemon=True).start()

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    async def start_all():
        counter_task = asyncio.create_task(push_counter())
        await counter_task

    threading.Thread(target=loop.run_until_complete, args=(start_all(),), daemon=True).start()

    if getattr(sys, 'frozen', False):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(".")
    index_path = os.path.join(base_path, "ui", "dist", "index.html")

    global window
    window = webview.create_window("React/TS in pywebview", index_path, js_api=API())
    webview.start(debug=True)

if __name__ == '__main__':
    main()
