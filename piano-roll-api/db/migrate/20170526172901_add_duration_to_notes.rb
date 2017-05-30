class AddDurationToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :duration, :float
  end
end
