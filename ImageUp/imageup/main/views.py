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

command = ['python', 'main/deleteOldFiles.py']
proc = subprocess.Popen(command)

def size_up(request):
    print("Method:", request.method)
    print("FILES:", request.FILES)
    img_static_path = None
    out_static_path = None
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

                # クライアントに渡すファイルパス
                img_static_dir = 'static/imgs/'
                img_static_path = img_static_dir + dt_now + '.jpg'
                out_static_path = img_static_dir + dt_now + '_sizeup' + '.jpg'
            
            else:
                # 画像が格納されていなければNoneを設定する
                img_static_path = None
                out_static_path = None

        except Exception as e:
            # エラー処理
            print('エラー発生')
            print(e)
            img_static_path = None
            out_static_path = None
    return render(request, 'main/index.html', {'img_path': img_static_path, 'out_path': out_static_path})