import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()


from dictionaries.models import Dictionary
from authentication.models import User

user = User.objects.filter(username="admin").first()

for x in range(100):
    dictionary = Dictionary(name="My Turkish Dictionary "+str(x),language="tr",created_by=user)
    dictionary.save()