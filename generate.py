import json
import os
import re
import shutil
from string import Template

def compress_paths(paths):
    def flush_range():
        if range_prefix:
            # Flush range
            if range_first == range_last:
                result.append(f'{range_prefix}{range_first}')
            else:
                result.append(f'{range_prefix}{range_first}*{range_last}')
    result = []
    range_prefix = None
    for path in paths:
        m = re.search('^(.*[-/])([0-9]+)$', path)
        if m:
            # Joinable path
            if m.group(1) == range_prefix:
                # Add to range
                range_last = int(m.group(2))
            else:
                flush_range()
                # Start new range
                range_prefix = m.group(1)
                range_first = int(m.group(2))
                range_last = range_first
        else:
            # Non-joinable path
            flush_range()
            range_prefix = None
            result.append(path)
    flush_range()
    return result

def compress_paths_from_file(file):
    with open(file) as f:
        paths = [line.strip() for line in f.readlines()]
        return compress_paths(paths)

def main():
    with open('languages.json') as f:
        languages = json.load(f)

    books = [
        'bg',
        'bg1972',
        'cc',
        'sb',
        'transcripts',
        'letters'
    ]

    compressed_paths_by_book = {
        'bg':          compress_paths_from_file('paths/bg.txt'),
        'bg1972':      compress_paths_from_file('paths/bg1972.txt'),
        'cc':          compress_paths_from_file('paths/cc.txt'),
        'sb':          compress_paths_from_file('paths/sb.txt'),
        'transcripts': compress_paths_from_file('paths/transcripts.txt'),
        'letters':     compress_paths_from_file('paths/letters.txt')
    }

    with open('templates/index.html') as f:
        index_template = Template(f.read())

    with open('templates/redirector.html') as f:
        redirector_template = Template(f.read())

    for output_dir in ['output_debug', 'output_local', 'output_public']:
        link_suffix = '' if output_dir == 'output_public' else '/index.html'

        # Create directory tree

        shutil.rmtree(output_dir, ignore_errors=True)
        os.mkdir(output_dir)

        shutil.copytree('assets', f'{output_dir}/assets')

        # Make index.html

        def link_html(language, book):
            link = f'{language["id"]}/{book}{link_suffix}'
            return f'          <div><a href="{link}">{language[book]["name"]}</a></div>\n'

        def language_html(language):
            books_in_lang = [book for book in books if book in language]
            return \
                f'        <div class="col-lg-6">\n' + \
                f'          <h3>{language["name"]}</h3>\n' + \
                ''.join([link_html(language, book) for book in books_in_lang]) + \
                f'        </div>'

        links_html = '\n'.join(map(language_html, languages))

        with open(f'{output_dir}/index.html', 'w') as f:
            f.write(index_template.substitute(links=links_html))

        # Make redirectors

        for language in languages:
            os.mkdir(f'{output_dir}/{language["id"]}')

            for book in books:
                if book not in language:
                    continue

                # Make compressed_paths string, filter by canto limit
                limit = language[book].get('limit')
                def filter_path(path):
                    if limit:
                        m = re.search('^([0-9]+)/', path)
                        if m and int(m.group(1)) > limit:
                            return False
                    return True
                compressed_paths = ','.join([path for path in compressed_paths_by_book[book] if filter_path(path)])

                os.mkdir(f'{output_dir}/{language["id"]}/{book}')
                with open(f'{output_dir}/{language["id"]}/{book}/index.html', 'w') as f:
                    if book == 'bg1972':
                        url_prefix = f'https://vanisource.org/wiki/BG_'
                        url_suffix = f'_(1972)'
                    else:
                        url_prefix = f'https://vedabase.io/{language["id"]}/library/{book}/'
                        url_suffix = ''
                    f.write(
                        redirector_template.substitute(
                            url_prefix=url_prefix,
                            url_suffix=url_suffix,
                            compressed_paths=compressed_paths,
                            debug_links='true' if output_dir == 'output_debug' else 'false'
                        )
                    )

if __name__ == '__main__':
    main()