Prepare python virtual environment and enter into that:

```shell
python3 -m venv ~/venv/pywebview
source ~/venv/pywebview/bin/activate
```

To build:

```shell
pip install -r ./requirements.txt
cd ui
npm install
npm run build
cd ..
pyinstaller backend.py --name MyApp --add-data "ui/dist:ui/dist" --windowed
```

Resulting app is in dist/
