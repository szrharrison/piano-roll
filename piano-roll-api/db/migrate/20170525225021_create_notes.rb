class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.integer :track_id
      t.numeric :velocity
      t.integer :pitch
      t.numeric :start_time

      t.timestamps
    end
  end
end
