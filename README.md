# TFM in browser
## Starting the proxy
First, install `websockify`. Download the zip/tar.gz from [the github repo](https://github.com/novnc/websockify/releases).

Unarchive and once inside the directory, run `python3 setup.py install`. You might need administrator access for this.

After installing, come to the Tfmbrowser repo directory and run `websockify 127.0.0.1:8000 --token-plugin TokenFile --token-source proxypaths`.

## Starting the web server
Run `node sever.js`, open [localhost:3000](http://locahost:3000) and that is it.