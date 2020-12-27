import re


def preprocess_text(text):
    text = text.lower().replace("ё", "е")
    text = re.sub(r'((www\.[^\s]+)|(https?://[^\s]+))', 'URL', text)
    text = re.sub(r'@[^\s]+', 'USER', text)
    text = re.sub('[^a-zA-Zа-яА-Я1-9]+', ' ', text)
    text = re.sub(' +', ' ', text)
    return text.strip()
