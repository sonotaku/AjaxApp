class PostsController < ApplicationController
  def index 
    @posts = Post.all
  end

  def create
    # メモ作成時に未読の情報を保存するように
    # レスポンスをAjaxに変更する
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    # URLパラメーターから、既読したメモのidが渡されるよう設定、そのidを使用し該当するレコードを取得
    # 既読してる→既読を解除するためにfalseへ変更
    # 既読してない→既読にするためtrueへ変更
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    # 更新したレコードを取得し直しJSON形式（データ）としてchecked.jsに返却
    item = Post.find(params[:id])
    render json: { post: item }
  end
end

