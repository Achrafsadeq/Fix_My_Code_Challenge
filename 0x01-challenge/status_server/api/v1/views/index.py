#!/usr/bin/python3
"""
Fixed Flask Status API
"""
from flask import Flask, jsonify
from api.v1.views import app_views

@app_views.route('/api/v1/status', methods=['GET'], strict_slashes=False)
def status():
    """Web server status report.
    """
    return jsonify({"status": "OK"})
