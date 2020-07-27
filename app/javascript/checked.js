function check() {
  //  投稿のDOMを取得している
  const posts = document.getElementsByClassName("post");
   postA = Array.from(posts);    //  ←postsを配列にする

  postA.forEach(function (post) {
    //  addEventListenerが重複して追加されることを回避
    if (post.getAttribute("data-load") != null) {
      return null
    }
    post.setAttribute("data-load", "true");
    // 投稿をクリックした場合に実行する処理を定義している
    post.addEventListener('click', (e) => {   //  clickイベントの開催スタート！
      // どの投稿をクリックしたのか、カスタムデータを利用して取得している
        const postId = post.getAttribute("data-id");
        // Ajaxに必要なオブジェクトを生成してる
        const XHR = new XMLHttpRequest();
        // openでリクエストを初期化している
        XHR.open("GET", `/posts/${postId}`, true);
        // レスポンスのタイプを指定する
        XHR.responseType = "json";
        // sendでリクエストを送信する
        XHR.send();
        // レスポンスを受け取ったときの処理を記述する
        XHR.onload = () => {
          const item = XHR.response.post;   //checkedアクションで返却したitemを取得
          if (item.checked === true) {            //既読の場合
            post.setAttribute("data-check", "true"); //data-checkの属性値にtrueを
          } else if (item.checked === false) {
            post.removeAttribute("data-check");//属性ごと削除
          }
          //レスポンスがエラーの場合
          if (XHR.status != 200) {
            alert(`Error ${XHR.status}: ${XHR.statusText}`);
          } else {
            return null;
          }
        }
        //リクエストが失敗して、jsonが受信できなかった場合
        XHR.onerror = () => {
          alert("Request failed");
        };
        e.preventDefault();     //clickイベントをキャンセル（重複しないように）
    });
  });
}

setInterval(check, 1000);