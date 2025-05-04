from typing import Any
import asyncio
import threading
import webview
import os
import sys
        
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
    def __init__(self):
        self.c = 0
        
    def say_hello(self) -> str:
        self.c += 1
        return f"Hello from Python! {self.c}"

def main():
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
