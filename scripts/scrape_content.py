import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE_URL = "https://chamiecakes.com/"
OUTPUT_DIR = "public/images/scraped"
CONTENT_FILE = "scripts/scraped_content.txt"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(os.path.dirname(CONTENT_FILE), exist_ok=True)

def scrape():
    print(f"Scraping {BASE_URL}...")
    try:
        # We add a User-Agent to prevent 403 Forbidden errors
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(BASE_URL, headers=headers, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"Failed to fetch {BASE_URL}: {e}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 1. Scrape Images
    img_tags = soup.find_all('img')
    print(f"Found {len(img_tags)} image tags.")
    
    downloaded = 0
    for img in img_tags:
        src = img.get('src') or img.get('data-src')
        if not src:
            continue
            
        img_url = urljoin(BASE_URL, src)
        
        # Skip small icons/logos if necessary, but we'll try to get everything for now
        if img_url.startswith('data:image'):
            continue
            
        try:
            img_name = os.path.basename(urlparse(img_url).path)
            if not img_name:
                continue
                
            img_path = os.path.join(OUTPUT_DIR, img_name)
            
            # Download image
            img_response = requests.get(img_url, headers=headers, stream=True)
            if img_response.status_code == 200:
                with open(img_path, 'wb') as f:
                    for chunk in img_response.iter_content(1024):
                        f.write(chunk)
                downloaded += 1
                print(f"Downloaded: {img_name}")
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")
            
    print(f"Successfully downloaded {downloaded} images to {OUTPUT_DIR}")
    
    # 2. Scrape Text Content
    print("Extracting text content...")
    with open(CONTENT_FILE, 'w', encoding='utf-8') as f:
        # Headings
        for i in range(1, 4):
            headings = soup.find_all(f'h{i}')
            if headings:
                f.write(f"\n--- H{i} Headings ---\n")
                for h in headings:
                    text = h.get_text(strip=True)
                    if text:
                        f.write(f"{text}\n")
        
        # Paragraphs
        f.write(f"\n--- Paragraphs ---\n")
        for p in soup.find_all('p'):
            text = p.get_text(strip=True)
            if text:
                f.write(f"{text}\n")
                
    print(f"Content saved to {CONTENT_FILE}")

if __name__ == "__main__":
    scrape()
