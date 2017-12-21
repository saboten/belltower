class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.belongs_to :post, index: true
      t.string :name
      t.json :content
      t.boolean :trashed, default: false
      t.timestamps null: false
    end
  end
end
