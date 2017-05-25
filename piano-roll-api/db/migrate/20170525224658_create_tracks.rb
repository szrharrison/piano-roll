class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.integer :song_id
      t.numeric :start_time
      t.numeric :duration
      t.string :name
      t.integer :instrument_id
      t.integer :channel_number

      t.timestamps
    end
  end
end
