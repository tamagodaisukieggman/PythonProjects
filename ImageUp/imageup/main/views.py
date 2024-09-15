import cv2
import datetime
import numpy as np
from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.base import ContentFile
import os
import subprocess

# Create your views here.
def hello_world(request):
    return HttpResponse("<p>Hello, World!</p>")

def index(request):
    return render(request, 'main/index.html')

def size_up(request):
    print("Method:", request.method)
    print("FILES:", request.FILES)
    if request.method == 'POST' and request.FILES['img']:
        try:
            # POSTによりにより受信した画像を読み込む
            img_file = request.FILES['img']
            img_array = np.asarray(bytearray(img_file.read()), dtype=np.uint8)

            # 画像が格納されていれば、後段の処理に進む
            if img_array.size != 0:
                img = cv2.imdecode(img_array, 1)

                # ファイル名を現在時刻とし「main/static/imgs/」に保存する
                img_dir = 'main/static/imgs/'
                dt_now = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
                img_path = img_dir + dt_now + '.jpg'
                out_path = img_dir + dt_now + '_sizeup' + '.jpg'
                cv2.imwrite(img_path, img)

                # Real-ESRGANの処理実行
                os.chdir('realesrgan/')
                input_command = ['./realesrgan-ncnn-vulkan', '-i', '../' + img_path, '-o', '../' + out_path]
                subprocess.run(input_command)
                os.chdir('../')

        except Exception as e:
            # エラー処理
            print('エラー発生')
            print(e)
    return render(request, 'main/index.html')