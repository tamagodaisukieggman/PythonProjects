from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    '''
    ビュー関数
    ユーザーからのリクエストを受け取って処理する
    '''
    return render(request, 'blog/index.html')