import os
import socket
from flask import Flask, render_template, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

app = Flask(
    __name__,
    template_folder=TEMPLATES_DIR,
    static_folder=STATIC_DIR
)


def get_network_ips():
    """Discover local network IPv4 addresses for LAN / mobile testing."""
    ips = []
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        active_ip = s.getsockname()[0]
        s.close()
        if active_ip and not active_ip.startswith("127."):
            ips.append(active_ip)
    except Exception:
        pass

    try:
        hostname = socket.gethostname()
        for ip in socket.gethostbyname_ex(hostname)[2]:
            if not ip.startswith("127.") and ip not in ips:
                ips.append(ip)
    except Exception:
        pass

    real_ips = [ip for ip in ips if not ip.startswith("192.168.56.")]
    return real_ips if real_ips else (ips if ips else ["127.0.0.1"])


# --- Main Web Routes ---
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login")
def login():
    return render_template("login.html")


# --- Fallback routes for direct asset paths in JS or CSS ---
@app.route("/Images/<path:filename>")
def serve_images(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "Images"), filename)


@app.route("/Videos/<path:filename>")
def serve_videos(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "Videos"), filename)


@app.route("/Music/<path:filename>")
@app.route("/MUSIC/<path:filename>")
def serve_music(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "Music"), filename)


@app.route("/pdf/<path:filename>")
def serve_pdf(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "pdf"), filename)


@app.route("/cursor/<path:filename>")
def serve_cursor(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "cursor"), filename)


if __name__ == "__main__":
    ips = get_network_ips()
    primary_ip = ips[0]
    port = 5000

    print("=" * 68)
    print(" 🍌  Banana Store Web Server is RUNNING!")
    print("=" * 68)
    print(f" 💻 On your computer browser:     http://127.0.0.1:{port}/")
    print(f" 📱 On your Mobile Phone / LAN:   http://{primary_ip}:{port}/")
    print(f" 🔐 Login Page:                  http://{primary_ip}:{port}/login")
    if len(ips) > 1:
        for extra in ips[1:]:
            print(f"    (Alternate IP: http://{extra}:{port}/)")
    print("=" * 68 + "\n")

    app.run(host="0.0.0.0", port=port, debug=True)
