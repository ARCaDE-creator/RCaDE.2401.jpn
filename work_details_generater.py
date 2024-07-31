import json

# テンプレートを読み込む
template = """
<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RCαDE - {title}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <div class="container">
            <a href="index{suffix}.html" class="logo-link">
                <img src="images/logo/logo.svg" alt="RCαDEロゴ">
                <span>RCαDE</span>
            </a>
            <div id="language-toggle" class="language-toggle">
                {language_toggle}
            </div>
            <nav>
                <ul class="nav-links" id="nav-links">
                    <li><a href="index{suffix}.html">{home_text}</a></li>
                    <li><a href="works{suffix}.html">{works_text}</a></li>
                </ul>
                <div class="menu-toggle" id="menu-toggle">
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                </div>
            </nav>
        </div>
    </header>
    <main>
        <section class="details-work">
            <div class="work-explain">
                <h2>{title}</h2>
                <p>DOI: {work_doi}</p>
                <p>{date_text}: {date}</p>
                <div class="details-content">
                    <img src="images/{id}/{image}" alt="{title}" class="details-image">
                    <p>{description}</p>
                </div>
            </div>
        </section>
        <section class="annotation">
            <div class="annotation2">
                <p>{annotation_text}</p>
                <a href="https://doi.org/{paper_doi}">{doi_link_text}</a>
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Research Compendium and Digital Exhibition</p>
    </footer>
    <script src="js/scripts.js"></script>
</body>
</html>
"""

# JSONデータを読み込む
with open('data/works.json', 'r') as file:
    works = json.load(file)

# 各作品の詳細ページを生成する
for work in works:
    for lang in ['ja', 'en']:
        if lang == 'ja':
            suffix = ''
            lang_name = '日本語'
            other_lang_name = 'English'
            language_toggle = f'<a href="{work["id"]}.html" class="language-option active">{lang_name}</a> / <a href="{work["id"]}_en.html" class="language-option">{other_lang_name}</a>'
            home_text = 'ホーム'
            works_text = '作品'
            date_text = '投稿日'
            annotation_text = 'このイラストは研究実施者の監修の元で作成されました。'
            doi_link_text = '原著論文はコチラ'
        else:
            suffix = '_en'
            lang_name = 'English'
            other_lang_name = '日本語'
            language_toggle = f'<a href="{work["id"]}_en.html" class="language-option active">{lang_name}</a> / <a href="{work["id"]}.html" class="language-option">{other_lang_name}</a>'
            home_text = 'Home'
            works_text = 'Works'
            date_text = 'Date'
            annotation_text = 'This illustration was created under the supervision of the researcher who conducted this study.'
            doi_link_text = 'The original Article is here.'

        filename = f"{work['id']}{suffix}.html"
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(template.format(
                lang=lang,
                title=work[f'title_{lang}'],
                work_doi=work['work_doi'],
                paper_doi=work['paper_doi'],
                date=work['date'],
                id=work['id'],
                image=work[f'image_{lang}'],
                description=work[f'description_{lang}'],
                suffix=suffix,
                home_text=home_text,
                works_text=works_text,
                date_text=date_text,
                annotation_text=annotation_text,
                doi_link_text=doi_link_text,
                language_toggle=language_toggle
            ))

print("HTML files generated successfully.")
