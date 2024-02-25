import re
import requests

def crawl_section(section, pages):
    paths = []
    for page in range(pages):
        url = f'https://vedabase.io/en/library/{section}/?page={page+1}'
        print(url)
        for line in requests.get(url).text.splitlines():
            match = re.search(f'<a .*href="/en/library/{section}/([^/]+)/">', line)
            if match:
                print(match.group(1))
                paths.append(match.group(1))

    # Sort in natural order so that foo-9 comes before foo-10
    # https://stackoverflow.com/a/5967539
    def natural_keys(text):
        return [(int(t) if t.isdigit() else t) for t in re.split(r'(\d+)', text)]
    paths.sort(key=natural_keys)

    with open(f'paths/{section}.txt', 'w') as f:
        f.write(''.join([p + '\n' for p in paths]))

# Create paths/transcripts.txt
crawl_section('transcripts', 309)

# Create paths/letters.txt
crawl_section('letters', 549)
