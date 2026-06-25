#!/usr/bin/env python3
"""
Map old URLs from srkrec.ac.in to the new URLs in this project.
Supports resolving a single URL, batch processing a list of URLs,
and running a local 302 HTTP redirection server.

Usage:
  # Resolve a single URL
  python scripts/map-old-urls.py resolve "https://srkrec.ac.in/civil.php"
  
  # Run a local 302 redirect server
  python scripts/map-old-urls.py server --port 8080 --target-host "http://localhost:4321"
  
  # Batch map a file of URLs
  python scripts/map-old-urls.py batch urls.txt --output mappings.csv
"""

import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse, urlunparse
from http.server import HTTPServer, BaseHTTPRequestHandler

ROOT = Path(__file__).resolve().parents[1]
VERCEL_JSON_PATH = ROOT / "vercel.json"


def load_redirect_rules() -> list[dict]:
    """Load redirects from vercel.json."""
    if not VERCEL_JSON_PATH.exists():
        print(f"Warning: {VERCEL_JSON_PATH} not found. Using fallback rules.", file=sys.stderr)
        return []
    
    try:
        with open(VERCEL_JSON_PATH, "r", encoding="utf-8") as f:
            config = json.load(f)
            return config.get("redirects", [])
    except Exception as e:
        print(f"Error reading {VERCEL_JSON_PATH}: {e}", file=sys.stderr)
        return []


def compile_rules(rules: list[dict]) -> list[tuple[re.Pattern, str]]:
    """Compile vercel-style source paths into regex patterns."""
    compiled = []
    for rule in rules:
        source = rule.get("source", "")
        destination = rule.get("destination", "")
        if not source or not destination:
            continue
        
        # Convert Vercel source pattern to regex pattern
        # Convert (.*) to standard regex group
        pattern_str = source
        # Escape special regex chars except parentheses and wildcards
        # If it doesn't start with ^, we anchor it to the start
        if not pattern_str.startswith("^"):
            # Escape path slash/dots but keep regex groups intact
            # Simple conversion: replace Vercel style paths
            pattern_str = pattern_str.replace(".", r"\.")
            # Vercel (.*) is already regex-like, let's make it strict
            pattern_str = f"^{pattern_str}$"
        
        try:
            compiled.append((re.compile(pattern_str), destination))
        except re.error as e:
            print(f"Skipping invalid regex '{pattern_str}': {e}", file=sys.stderr)
            
    return compiled


def map_path(path: str, compiled_rules: list[tuple[re.Pattern, str]]) -> str:
    """Match path against rules and return the destination path."""
    # Ensure path starts with /
    if not path.startswith("/"):
        path = "/" + path
        
    for pattern, destination in compiled_rules:
        match = pattern.match(path)
        if match:
            # If the destination contains placeholders like $1, replace them with group matches
            dest = destination
            for i, group in enumerate(match.groups(), start=1):
                placeholder = f"${i}"
                if placeholder in dest:
                    dest = dest.replace(placeholder, group)
            return dest
            
    return "/"  # Default fallback if no redirect matches


def map_full_url(url: str, compiled_rules: list[tuple[re.Pattern, str]], target_host: str = "") -> str:
    """Map an entire old URL to the new URL with optional target host."""
    parsed = urlparse(url)
    mapped_path_str = map_path(parsed.path, compiled_rules)
    
    if target_host:
        target_parsed = urlparse(target_host)
        return urlunparse((
            target_parsed.scheme,
            target_parsed.netloc,
            mapped_path_str,
            parsed.params,
            parsed.query,
            parsed.fragment
        ))
    else:
        # Return path relative
        return mapped_path_str


class RedirectHandler(BaseHTTPRequestHandler):
    """HTTP Request Handler to serve 302 redirects."""
    compiled_rules = []
    target_host = "https://srkrec.ac.in"

    def do_GET(self):
        # Parse current request path
        parsed_url = urlparse(self.path)
        new_path = map_path(parsed_url.path, self.compiled_rules)
        
        # Build redirect URL
        target_parsed = urlparse(self.target_host)
        redirect_url = urlunparse((
            target_parsed.scheme,
            target_parsed.netloc,
            new_path,
            parsed_url.params,
            parsed_url.query,
            parsed_url.fragment
        ))
        
        # Send 302 Redirection response
        self.send_response(302)
        self.send_header("Location", redirect_url)
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.end_headers()
        
        print(f"Redirecting (302): {self.path} -> {redirect_url}")


def run_server(port: int, target_host: str, compiled_rules: list):
    """Start local redirection server."""
    RedirectHandler.compiled_rules = compiled_rules
    RedirectHandler.target_host = target_host
    
    server_address = ("", port)
    httpd = HTTPServer(server_address, RedirectHandler)
    print(f"Starting 302 redirect server on port {port}...")
    print(f"Redirecting all traffic to: {target_host}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down redirect server.")
        httpd.server_close()


def main():
    parser = argparse.ArgumentParser(description="Map old URLs from srkrec.ac.in to new URLs.")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # Resolve sub-command
    resolve_parser = subparsers.add_parser("resolve", help="Resolve a single old URL.")
    resolve_parser.add_argument("url", help="Old URL to map (e.g. /about.php or https://srkrec.ac.in/about.php)")
    resolve_parser.add_argument("--target-host", default="https://srkrec.ac.in", help="Domain to prepend (default: https://srkrec.ac.in)")
    
    # Batch sub-command
    batch_parser = subparsers.add_parser("batch", help="Batch map a file containing old URLs.")
    batch_parser.add_argument("input_file", help="Path to input text file with one URL per line.")
    batch_parser.add_argument("--output", "-o", help="Path to output CSV file.")
    batch_parser.add_argument("--target-host", default="https://srkrec.ac.in", help="Domain to prepend (default: https://srkrec.ac.in)")
    
    # Server sub-command
    server_parser = subparsers.add_parser("server", help="Run a local 302 HTTP redirection server.")
    server_parser.add_argument("--port", type=int, default=8080, help="Port to run the server on (default: 8080)")
    server_parser.add_argument("--target-host", default="https://srkrec.ac.in", help="Domain to redirect to (default: https://srkrec.ac.in)")
    
    args = parser.parse_args()
    
    rules = load_redirect_rules()
    compiled_rules = compile_rules(rules)
    
    if args.command == "resolve":
        mapped = map_full_url(args.url, compiled_rules, args.target_host)
        print(f"Old URL: {args.url}")
        print(f"New URL: {mapped} (302 Redirection)")
        
    elif args.command == "batch":
        input_path = Path(args.input_file)
        if not input_path.exists():
            print(f"Error: Input file {input_path} does not exist.", file=sys.stderr)
            sys.exit(1)
            
        urls = input_path.read_text(encoding="utf-8").splitlines()
        mappings = []
        for url in urls:
            url = url.strip()
            if not url:
                continue
            mapped = map_full_url(url, compiled_rules, args.target_host)
            mappings.append((url, mapped))
            
        if args.output:
            output_path = Path(args.output)
            with open(output_path, "w", encoding="utf-8") as f:
                f.write("Old URL,New URL,Redirect Code\n")
                for old, new in mappings:
                    f.write(f'"{old}","{new}",302\n')
            print(f"Successfully wrote {len(mappings)} mappings to {output_path}")
        else:
            print("Old URL -> New URL (302)")
            for old, new in mappings:
                print(f"{old} -> {new}")
                
    elif args.command == "server":
        run_server(args.port, args.target_host, compiled_rules)


if __name__ == "__main__":
    main()
