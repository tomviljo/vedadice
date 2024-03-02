import re
import requests

site_base = 'https://www.wisdomlib.org'

with open(f'paths/cb.txt', 'w') as f:
    rel_base = '/hinduism/book/chaitanya-bhagavata'
    for toc_line in requests.get(f'{site_base}{rel_base}').text.splitlines():
        chapter_match = re.search(f'<a href="{rel_base}/d/doc([0-9]+)[.]html">(Chapter [0-9].*?)</a>', toc_line)
        if chapter_match:
            print(chapter_match.group(1), chapter_match.group(2))
            for chapter_line in requests.get(f'{site_base}{rel_base}/d/doc{chapter_match.group(1)}.html').text.splitlines():
                verse_match = re.search(f'<a href="{rel_base}/d/doc([0-9]+)[.]html">(Verse [0-9].*?)</a>', chapter_line)
                if verse_match:
                    print(verse_match.group(1), verse_match.group(2))
                    print(verse_match.group(1), file=f)
