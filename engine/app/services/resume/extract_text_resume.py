import pymupdf
from app.core.config import MEDIA_DIR


def text_extracter(pdf_path: str):
    doc = pymupdf.open(pdf_path)
    text_pages=[]
    for page in doc:
        text = page.get_text().encode("utf-8")
        text_pages.append(text)

    return text_pages
