from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'website/index.html')

def base(request):
    return render(request, 'website/base.html')

def career(request):
    return render(request, 'website/portfolio-details.html')