var fileArea = document.getElementById('dragDropArea');
var fileInput = document.getElementById('fileInput');

// dragover時の処理
fileArea.addEventListener('dragover', function(evt){
    evt.preventDefault();
    fileArea.classList.add('dragover');
});

// dragleave時の処理
fileArea.addEventListener('dragleave', function(evt){
    evt.preventDefault();
    fileArea.classList.remove('dragover');
});

// drop時の処理
fileArea.addEventListener('drop', function(evt){
    evt.preventDefault();
    fileArea.classList.remove('dragover');
    var files = evt.dataTransfer.files;

    // fileCheck関数によりファイルチェック
    if (fileCheck(files[0])) {
        console.log('DRAG & DROP');
        fileInput.files = files;
        // photoPreview関数呼び出し
        photoPreview(null, files[0]);
    }
});

// 関数の追加
function photoPreview(event, f=null) {
    var file = f;
    // fileがnullであればeventより取得
    if (file === null) {
        file = event.target.files[0];
    }

    // 変数の定義
    var reader = new FileReader();
    var preview = document.getElementById('previewArea');
    var previewImage = document.getElementById('previewImage');

    // プレビューエリアの画像が既に存在したら削除
    if (previewImage != null) {
        preview.removeChild(previewImage);
    }

    // 画像ファイルをプレビューエリアに追加
    reader.onload = function(event) {
        var img = document.createElement('img');
        img.setAttribute('src', reader.result);
        img.setAttribute('id', 'previewImage');
        preview.appendChild(img);
    };

    // 送信用に画像ファイルの読み込み
    reader.readAsDataURL(file);

    // ドラッグ&ドロップエリアのテキスト非表示
    document.getElementById('drag-drop-comemnt').style.display = 'none';
}

// fileCheckの追加
// 許容するファイル拡張子
const allowExtentions = '.(jpeg|jpg|png|webp)$';

// ファイルチェック処理
function fileCheck(file) {
    if (!file.name.match(allowExtentions)) {
        alert('拡張子がjpeg, jpg, png, webp以外のファイルはアップロードできません。');
        return false;
    }
    return true;
}