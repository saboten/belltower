class CreateApplicants < ActiveRecord::Migration[5.1]
  def change
    create_table :applicants do |t|
      t.string :name
      t.string :email
      t.json :content
      t.timestamps null: false
    end
  end
end
