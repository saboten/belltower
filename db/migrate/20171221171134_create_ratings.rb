class CreateRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :ratings do |t|
      t.belongs_to :applicant, index: true
      t.belongs_to :rating, index: true
      t.integer :value, default: 0
      t.timestamps
    end
  end
end
