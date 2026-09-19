#!/usr/bin/env python3
"""
Simple startup script for QuantumMedic
Checks dependencies and starts the server
"""

import subprocess
import sys
import os
import webbrowser
from pathlib import Path

def check_dependencies():
    """Check if required packages are installed"""
    print("🔍 Checking dependencies...")
    
    try:
        import flask
        import qiskit
        import sklearn
        import numpy
        print("✅ All dependencies found!\n")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("\nInstalling dependencies...\n")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        return True

def main():
    print("""
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║          🔬 Welcome to QuantumMedic! 🔬              ║
    ║                                                       ║
    ║   Quantum ML for Medical Diagnostics                ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
    """)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    print("🚀 Starting QuantumMedic server...")
    print("📡 Backend: http://localhost:5000")
    print("🌐 Frontend: http://localhost:5000/index.html")
    print("\n⏳ Initializing quantum circuits...")
    print("💡 Press Ctrl+C to stop the server\n")
    
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Start the backend
    try:
        subprocess.run([sys.executable, "backend.py"], check=True)
    except KeyboardInterrupt:
        print("\n\n👋 QuantumMedic stopped. Thank you for using quantum ML for healthcare!")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
