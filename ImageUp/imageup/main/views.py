from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def hello_world(request):
    return HttpResponse("<p>Hello, World!</p>")

def index(request):
    return render(request, 'main/index.html')
