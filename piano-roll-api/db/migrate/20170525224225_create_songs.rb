class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.numeric :duration
      t.integer :bpm

      t.timestamps
    end
  end
end
