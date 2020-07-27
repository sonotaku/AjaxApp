function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      const list = document.getElementById("list");
      // 「メモの入力フォーム」をリセットするため
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義
      const HTML = 
      `<div class="post" data-id=${item.id}>
          <div class="post-data">
            投稿日時:${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // listの要素直後に挿入
        list.insertAdjacentHTML("afterend",HTML);

        // 「メモの入力フォームに入力されたままの文字」はリセット(上書き)
        formText.value = "";

        // 200以外のHTTPステータスが返却された場合の処理
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }

    };

    // レスポンスが失敗した場合の処理
    XHR.onerror = function() {
      alert("Request failed");
    };

    e.preventDefault();
  })
}
window.addEventListener("load", memo);