Prepare python virtual environment and enter into that:

On Max and Linux:

```shell
python3 -m venv venv/pywebview
source venv/pywebview/bin/activate
```

On Windows:

```shell
python3 -m venv\pywebview
venv\pywebview\Scripts\activate
```

To build app:

```shell
pip install -r ./requirements.txt
cd ui
npm install
npm run build
```

To run:

```shell
python backend.py
```

To create Mac distribution:

```shell
pyinstaller backend.py --name MyApp --add-data "ui/dist:ui/dist" --windowed
```

To create Windows distribution:

```shell
pyinstaller backend.py --name MyApp --add-data "ui/dist;ui/dist" --windowed
```

Resulting app is in dist/
