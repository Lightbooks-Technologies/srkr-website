import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

base_url = "https://srkrec.edu.in"
visited = set()

def is_valid_url(url):
    return urlparse(url).netloc == urlparse(base_url).netloc

def crawl(url):
    if url in visited:
        return
    visited.add(url)
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')
        for link in soup.find_all("a", href=True):
            full_url = urljoin(base_url, link['href'])
            if is_valid_url(full_url):
                crawl(full_url)
    except Exception as e:
        print(f"Failed to access {url}: {e}")

crawl(base_url)

# Print or save all visited URLs
for u in visited:
    print(u)
