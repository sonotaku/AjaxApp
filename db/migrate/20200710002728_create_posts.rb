class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content
      # 既読か未読かを管理するカラム(true、またはfalse)
      t.boolean :checked
      t.timestamps
    end
  end
end
