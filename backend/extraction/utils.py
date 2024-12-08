import spacy
import re
import pickle
import PyPDF2
from io import BytesIO

def extract_data_from_pdf(pdf_file):
    text = ""

    pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_file.read()))
    num_pages = len(pdf_reader.pages)

    for page_num in range(num_pages):
        page = pdf_reader.pages[page_num]
        page_text = page.extract_text()
        lines = page_text.splitlines()
        for line in lines:
            text += line + "\n"
        text += "\n"

    nlp = spacy.load("fr_core_news_md")

    with open("C:/Users/Lenovo/Desktop/STAGE_PFE/deployment/backend/extraction/models/job_title_FFFfinalmodel.pkl", "rb") as file:
        job_title_model = pickle.load(file)
    with open("C:/Users/Lenovo/Desktop/STAGE_PFE/deployment/backend/extraction/models/company_name_FFFfinalmodel.pkl", "rb") as file:
        company_name_model = pickle.load(file)


    info = {
        'job_title': None,
        'company_name': None,
        'location': None,
        'salary': None,
        'benefits': None,
        'duration': None,
        'skills_qualifications': None,
        'opportunities': None,
        'contract_type': None,
        'language': [],
        'genre': None,
        'experience': None,
        'date_of_beginning': None,
        'date_of_expiration': None,  # Added for expiration date
        'phone_number': None,  # Added for phone number
        'email': None  # Added for email address
    }

    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents]
    lines = text.strip().split('\n')

     # Predict Job Title using the trained model
    info['job_title'] = job_title_model.predict([text])[0]

    # Predict Company Name using the trained model
    info['company_name'] = company_name_model.predict([text])[0]

    # Extract Job Title
    #info['job_title'] = lines[0].strip() if lines else ''
    #if not info['job_title']:
        #for sent in sentences:
            #if 'prof' in sent.lower() or 'profil' in sent.lower() or 'recherché' in sent.lower():
                #info['job_title'] = sent
                #break

    # Extract Company Name (Improved)
    #for ent in doc.ents:
        #if ent.label_ == "ORG":
            #info['company_name'] = ent.text
            #break  # Stop after finding the first ORG entity




    # Extract Location
    for ent in doc.ents:
        if ent.label_ == "LOC":
            info['location'] = ent.text
            break  # Stop after finding the first LOC entity

    # Extract Date of Beginning (No change)
    date_pattern = re.compile(r'\b\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|'
                             r'octobre|novembre|décembre)\b', re.IGNORECASE)
    date_match = date_pattern.search(text)
    if date_match:
        info['date_of_beginning'] = date_match.group(0)

    # Extract Date of Expiration (Added)
    expiration_pattern = re.compile(r'Date d\'expiration\s*:\s*(\d{1,2}/\d{1,2}/\d{4})', re.IGNORECASE)
    expiration_match = expiration_pattern.search(text)
    if expiration_match:
        info['date_of_expiration'] = expiration_match.group(1)

    # Extract Language (No change)
    language_keywords = ['français', 'anglais','allemand','arabe']
    for keyword in language_keywords:
        if keyword.lower() in text.lower():
            info['language'].append (keyword)


    # Extract Genre (No change)
    genre_keywords = ['homme', 'femme', 'indifférent']
    for keyword in genre_keywords:
        if keyword.lower() in text.lower():
            info['genre'] = keyword
            break

    # Extract Experience (No change)
    experience_pattern = re.compile(r'\b\d+\s+(?:ans?)\b', re.IGNORECASE)
    experience_match = experience_pattern.search(text)
    if experience_match:
        info['experience'] = experience_match.group(0)

    # Extract Salary (Improved)
    salary_pattern = re.compile(r'\d+\s?(?:K|k|€|dollars?|euros?)\b', re.IGNORECASE)  # More general pattern
    salary_match = salary_pattern.search(text)
    if salary_match:
        info['salary'] = salary_match.group(0)

    # Extract Duration (No change)
    duration_pattern = re.compile(r'\b\d+\s+(?:ans?|mois?|semaines?)\b', re.IGNORECASE)
    duration_match = duration_pattern.search(text)
    if duration_match:
        info['duration'] = duration_match.group(0)

    # Extract Contract Type (No change)
    contract_pattern = re.compile(r'\b(?:CDI|CDD|SIVP|stage|freelance)\b', re.IGNORECASE)
    contract_match = contract_pattern.search(text)
    if contract_match:
        info['contract_type'] = contract_match.group(0)

    # Extract Skills and Qualifications (New)
    # Liste prédéfinie de compétences techniques
    skills_list = [
    'Python', 'Java',  'C++','C#', 'Javascript', 'HTML', 'CSS','SASS','Bootstrap', 'SQL', 'MATLAB', 'Symfony','AJAX','Jquery','Laravel',
    'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'Perl', 'TypeScript', 'Django','.Net'
    'Flask', 'React', 'Angular', 'Vue.js', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes',
    'Git', 'Linux', 'AWS', 'Azure', 'GCP', 'Hadoop', 'Spark','SQL','telecoms','Communication','problem solving','learning skills','design patterns'
     ]

    skills_qualifications = []

    # Identifier les compétences présentes dans le texte
    for skill in skills_list:
        if skill.lower() in text.lower():  # Recherche insensible à la casse
            skills_qualifications.append(skill)

# Supprimer les doublons (au cas où) et stocker les compétences extraites
    info['skills_qualifications'] = list(set(skills_qualifications))

    # Extract Benefits (No change)
    benefits_keywords = ['avantages', 'benefices']
    benefits = []
    for sent in doc.sents:
        if any(keyword in sent.text.lower() for keyword in benefits_keywords):
            benefits.append(sent.text)
    info['benefits'] = ' '.join(benefits).strip()

    # Extract Opportunities (No change)
    opportunities_keywords = ['opportunité', 'croissance', 'carrière']
    opportunities = []
    for sent in doc.sents:
        if any(keyword in sent.text.lower() for keyword in opportunities_keywords):
            opportunities.append(sent.text)
    info['opportunities'] = ' '.join(opportunities).strip()

    # Extract Phone Number (New)
    phone_pattern = re.compile(r'\b(\+?[\d\s-]{7,15})\b', re.IGNORECASE)
    phone_match = phone_pattern.search(text)
    if phone_match:
        info['phone_number'] = phone_match.group(0)

    # Extract Email Address (New)
    email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', re.IGNORECASE)
    email_match = email_pattern.search(text)
    if email_match:
        info['email'] = email_match.group(0)

    return info
