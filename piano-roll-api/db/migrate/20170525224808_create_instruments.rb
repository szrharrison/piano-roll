class CreateInstruments < ActiveRecord::Migration[5.0]
  def change
    create_table :instruments do |t|
      t.string :name
      t.string :family
      t.boolean :is_percussion

      t.timestamps
    end
  end
end
