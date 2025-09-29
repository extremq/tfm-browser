# Transformice in browser
> Let's make Transformice work in the browser again!

<img width="532" height="371" alt="image" src="https://github.com/user-attachments/assets/2ad57509-a684-413a-9b79-9d1a56cd23a5" />

> [!NOTE]  
> This is still in development, and performance is not on par with Adobe Air TFM
## Context
Transformice needs Adobe Flash Player to run in the browser, but that has been unavailable since 2020. 
Because of this, the game has been playable only by installing it on your desktop.

However, [ruffle.rs](https://ruffle.rs/) has appeared, creating a Rust drop-in replacement for Adobe Flash, from scratch. 
Over the years, Ruffle has improved massively, and now we can play Transformice using it.

Unfortunately, we still cannot play in the browser directly. The game makes use of TCP sockets, and browsers do not support them. 
However, what we can instead do is to proxy all TCP traffic through a websocket, letting us communicate with the game server.
This requires that a proxy server is up and running, and Transformice does not have that, so we must self-host it using [websockify](https://github.com/novnc/websockify).

Using this, we can actually connect and play!

## Getting started
### Starting the proxy
First, install `websockify`. Download the zip/tar.gz from [the github repo](https://github.com/novnc/websockify/releases).

Unarchive and once inside the directory, run `python3 setup.py install`. You might need administrator access for this.

After installing, come to the Tfmbrowser repo directory and run `websockify 127.0.0.1:8000 --token-plugin TokenFile --token-source proxypaths`.

### Starting the web server
Run `node sever.js`, open [localhost:3000](http://locahost:3000) and that is it.

## Issues
Please report any inconsistencies you encounter. We try to maintain a separate Ruffle build that fixes some of them.
