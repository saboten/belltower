class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.belongs_to :user, index: true
      t.string :title
      t.text :content
      t.boolean :published, default: false
      t.boolean :trashed, default: false
      t.timestamps null: false
    end
  end
end
