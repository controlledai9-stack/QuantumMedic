# 🚀 Quick Start Guide - QuantumMedic

Get QuantumMedic running in **2 minutes**!

## Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

Takes about 2-3 minutes (Qiskit is a bit large).

## Step 2: Start the Server

**Option A - Easy (Recommended):**
```bash
python run.py
```

**Option B - Direct:**
```bash
python backend.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

## Step 3: Open the Web App

Open `index.html` in your browser by:

1. **Double-click** `index.html` file, OR
2. Open browser and go to: `http://localhost:5000/index.html` OR
3. Use Python's built-in server:
   ```bash
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

## Step 4: Use It!

1. Enter biomarker values (0.0 to 1.0)
2. Click **"Analyze with Quantum ML"**
3. See instant risk assessment!

## Troubleshooting

### "Port 5000 already in use"
```bash
python backend.py --port 5001
```

### "Cannot connect to backend"
- Make sure `python backend.py` is running
- Check that port 5000 is accessible
- Try restarting the server

### "Module not found"
```bash
pip install --upgrade qiskit qiskit-aer scikit-learn flask
```

## What Each File Does

| File | Purpose |
|------|---------|
| `backend.py` | Quantum ML engine (Flask server) |
| `index.html` | Web dashboard (open in browser) |
| `requirements.txt` | Python packages to install |
| `run.py` | Easy startup script |
| `README.md` | Full documentation |

## For GitHub/OpenAI

When sharing:
```bash
git init
git add .
git commit -m "Initial commit: QuantumMedic - Quantum ML for Healthcare"
git push origin main
```

Your GitHub will show:
- ✅ Quantum computing (Qiskit)
- ✅ Machine learning (scikit-learn)
- ✅ Web development (Flask + HTML/JS)
- ✅ Healthcare social impact
- ✅ Production-ready code

## Next Steps

1. **Try different biomarker values** - Test "healthy" vs "disease" profiles
2. **Read the code** - `backend.py` has detailed quantum ML implementation
3. **Deploy it** - Push to GitHub and share the link
4. **Show OpenAI** - This demonstrates real quantum+ML for social good!

---

**Questions?** Check `README.md` for full documentation.

**Ready to impress OpenAI?** Push this to GitHub! 🚀
